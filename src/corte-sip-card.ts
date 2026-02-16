import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';

interface SipCardConfig extends LovelaceCardConfig {
  name?: string;
  call_number?: string;
  camera_card?: LovelaceCardConfig; // Full embedded card config
}

interface SipCore {
  callState: string;
  callDuration: string;
  remoteName: string | null;
  remoteNumber: string | null;
  remoteAudioStream: MediaStream | null;
  remoteVideoStream: MediaStream | null;
  answerCall(): void;
  endCall(): void;
  startCall(number: string): void;
}

declare global {
  interface Window {
    sipCore?: SipCore;
  }
}

interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

@customElement('corte-sip-card-editor')
export class CorteSipCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: SipCardConfig;
  @state() private _showCardPicker = false;

  public setConfig(config: SipCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent | Event): void {
    if (!this._config || !this.hass) return;

    const target = ev.target as any;
    const configValue = target.configValue;

    if (!configValue) return;

    let value: any = target.value;

    // Don't update if value hasn't changed
    if (this._config[configValue] === value) return;

    const newConfig = {
      ...this._config,
      [configValue]: value || undefined,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _cameraCardChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;

    const newConfig = {
      ...this._config,
      camera_card: ev.detail.value || ev.detail.config,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _toggleCardPicker(): void {
    this._showCardPicker = !this._showCardPicker;
  }

  private _cardPicked(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;

    const newConfig = {
      ...this._config,
      camera_card: ev.detail.config,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
    this._showCardPicker = false;
  }

  private _deleteCard(): void {
    if (!this._config) return;

    const newConfig = {
      ...this._config,
      camera_card: undefined,
    };

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-textfield
          label="Name (Optional)"
          .value=${this._config.name || ''}
          .configValue=${'name'}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-textfield
          label="Call Number (Optional)"
          .value=${this._config.call_number || ''}
          .configValue=${'call_number'}
          @input=${this._valueChanged}
        ></ha-textfield>

        <div class="camera-config-section">
          <div class="camera-header">
            <h3>Camera Card (Optional)</h3>
            ${this._config.camera_card
              ? html`
                  <mwc-button @click=${this._deleteCard}>Remove</mwc-button>
                `
              : html`
                  <mwc-button @click=${this._toggleCardPicker}>Add Card</mwc-button>
                `}
          </div>
          
          ${this._showCardPicker
            ? html`
                <hui-card-picker
                  .hass=${this.hass}
                  @config-changed=${this._cardPicked}
                ></hui-card-picker>
              `
            : this._config.camera_card
              ? html`
                  <div class="card-editor-wrapper">
                    <div class="card-type-label">Type: ${this._config.camera_card.type}</div>
                    <hui-card-element-editor
                      .hass=${this.hass}
                      .value=${this._config.camera_card}
                      @config-changed=${this._cameraCardChanged}
                    ></hui-card-element-editor>
                  </div>
                `
              : ''}
        </div>
      </div>
    `;
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
    }

    .camera-config-section {
      margin-top: 16px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }

    .camera-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .card-editor-wrapper {
      margin-top: 12px;
    }

    .card-type-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
      padding: 4px 8px;
      background: var(--primary-background-color);
      border-radius: 4px;
      display: inline-block;
    }

    hui-card-element-editor {
      display: block;
      margin-top: 8px;
    }

    hui-card-picker {
      display: block;
    }
  `;
}

@customElement('corte-sip-card')
export class CorteSipCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: SipCardConfig;
  @state() private _sipCore?: SipCore;
  @state() private _isInitializing = true;
  private _initTimeout?: number;
  private _cameraCard?: LovelaceCard;
  private _cameraCardCreated = false;

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement(
      'corte-sip-card-editor',
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(): SipCardConfig {
    return {
      type: 'custom:corte-sip-card',
      name: 'SIP Call',
    };
  }

  public setConfig(config: SipCardConfig): void {
    this._config = config;
    // Reset the flag when config changes
    this._cameraCardCreated = false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (window.sipCore) {
      this._sipCore = window.sipCore;
      this._isInitializing = false;
    } else {
      // Wait up to 3 seconds for SIP Core to load before showing error
      this._initTimeout = window.setTimeout(() => {
        this._isInitializing = false;
        this.requestUpdate();
      }, 3000);
    }
    window.addEventListener('sipcore-update', this._updateHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('sipcore-update', this._updateHandler);
    if (this._initTimeout) {
      clearTimeout(this._initTimeout);
    }
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);

    // Create camera card when we have both hass and config
    if (this.hass && this._config?.camera_card && !this._cameraCardCreated) {
      console.log('[SIP Card] Triggering camera card creation in updated()');
      this._cameraCardCreated = true;
      this._createCameraCard();
    }

    // Update hass on existing camera card
    if (changedProperties.has('hass') && this._cameraCard) {
      this._cameraCard.hass = this.hass;
    }

    // Append camera card to container if it exists
    if (this._cameraCard) {
      const container = this.shadowRoot?.querySelector(
        '#camera-card-container',
      );
      console.log('[SIP Card] Container:', container, 'Card:', this._cameraCard);
      if (container && !container.contains(this._cameraCard)) {
        console.log('[SIP Card] Appending camera card to container');
        container.appendChild(this._cameraCard);
      }
    }
  }

  private async _createCameraCard(): Promise<void> {
    if (!this._config?.camera_card) {
      this._cameraCard = undefined;
      return;
    }

    console.log('[SIP Card] Creating camera card with config:', this._config.camera_card);

    try {
      const cardConfig = this._config.camera_card;

      // Get the card type and create the element
      const cardType = cardConfig.type.replace(/^custom:/, '');
      const elementType = cardConfig.type.startsWith('custom:')
        ? cardType
        : `hui-${cardType}-card`;

      console.log('[SIP Card] Element type:', elementType);

      // Try to wait for element definition, but don't block forever
      try {
        await Promise.race([
          customElements.whenDefined(elementType),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
          ),
        ]);
        console.log('[SIP Card] Element is defined');
      } catch (e) {
        console.warn(
          `Element ${elementType} not defined yet, attempting to create anyway`,
        );
      }

      // Create the element
      const element = document.createElement(elementType) as LovelaceCard;
      console.log('[SIP Card] Created element:', element);

      if (element && element.setConfig) {
        element.setConfig(cardConfig);
        element.hass = this.hass;
        this._cameraCard = element;
        console.log('[SIP Card] Camera card initialized successfully');
        this.requestUpdate();
      } else {
        console.error(
          `Element ${elementType} does not have setConfig method`,
        );
      }
    } catch (err) {
      console.error('Error creating camera card:', err);
      this._cameraCard = undefined;
    }
  }

  private _updateHandler = (): void => {
    if (!this._sipCore && window.sipCore) {
      this._sipCore = window.sipCore;
      this._isInitializing = false;
      if (this._initTimeout) {
        clearTimeout(this._initTimeout);
        this._initTimeout = undefined;
      }
    }
    this._updateStreams();
    this.requestUpdate();
  };

  private _updateStreams(): void {
    if (!this._sipCore) return;

    // Update audio stream
    const audioElement = this.shadowRoot?.getElementById(
      'corte-audio',
    ) as HTMLAudioElement;
    if (audioElement && this._sipCore.remoteAudioStream) {
      if (audioElement.srcObject !== this._sipCore.remoteAudioStream) {
        audioElement.srcObject = this._sipCore.remoteAudioStream;
      }
    }

    // Update video stream
    const videoElement = this.shadowRoot?.getElementById(
      'corte-video',
    ) as HTMLVideoElement;
    if (videoElement && this._sipCore.remoteVideoStream) {
      if (videoElement.srcObject !== this._sipCore.remoteVideoStream) {
        videoElement.srcObject = this._sipCore.remoteVideoStream;
      }
    }
  }

  private get _isRinging(): boolean {
    return this._sipCore?.callState === 'ringing';
  }

  private get _isInCall(): boolean {
    return (
      this._sipCore?.callState === 'connected' ||
      this._sipCore?.callState === 'talking'
    );
  }

  private get _callerName(): string {
    return this._sipCore?.remoteName || 'Unknown';
  }

  private get _callerNumber(): string {
    return this._sipCore?.remoteNumber || '';
  }

  private get _callDuration(): string {
    return this._sipCore?.callDuration || '';
  }

  private _answerCall(): void {
    this._sipCore?.answerCall();
  }

  private _endCall(): void {
    this._sipCore?.endCall();
  }

  private _startCall(): void {
    const number = this._config?.call_number;
    if (number && this._sipCore) {
      this._sipCore.startCall(number);
    }
  }

  protected render(): TemplateResult {
    const cardName = this._config?.name || 'SIP Call';

    if (!this._sipCore) {
      if (this._isInitializing) {
        return html`
          <ha-card>
            <div class="card-content">
              <div class="loading">Loading SIP Core...</div>
            </div>
          </ha-card>
        `;
      }
      return html`
        <ha-card>
          <div class="card-content">
            <div class="error">
              SIP Core not loaded. Make sure the SIP Core integration is
              installed and configured.
            </div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card .header=${cardName}>
        <div class="card-content">
          ${this._isRinging
            ? this._renderIncomingCall()
            : this._isInCall
              ? this._renderActiveCall()
              : this._renderIdle()}
        </div>
      </ha-card>
    `;
  }

  private _renderIncomingCall(): TemplateResult {
    return html`
      <div class="incoming-call">
        ${this._cameraCard
          ? html`<div id="camera-card-container"></div>`
          : html`<div class="call-icon">📞</div>`}
        <div class="call-info">
          <div class="caller-name">${this._callerName}</div>
          <div class="caller-number">${this._callerNumber}</div>
          <div class="call-status">Incoming Call...</div>
        </div>
        <div class="call-actions">
          <button
            class="action-button answer"
            @click=${this._answerCall}
            title="Answer Call"
          >
            <span class="button-icon">📞</span>
            <span class="button-text">Answer</span>
          </button>
          <button
            class="action-button reject"
            @click=${this._endCall}
            title="Reject Call"
          >
            <span class="button-icon">✖️</span>
            <span class="button-text">Reject</span>
          </button>
        </div>
      </div>
    `;
  }

  private _renderActiveCall(): TemplateResult {
    const hasVideo = this._sipCore?.remoteVideoStream;

    // Update streams after render
    setTimeout(() => this._updateStreams(), 0);

    return html`
      <div class="active-call">
        ${hasVideo
          ? html`
              <video
                id="corte-video"
                class="video-stream"
                autoplay
                playsinline
                muted
                controls
              ></video>
            `
          : this._cameraCard
            ? html`<div id="camera-card-container"></div>`
            : html`<div class="call-icon active">📞</div>`}
        <audio id="corte-audio" autoplay></audio>
        <div class="call-info">
          <div class="caller-name">${this._callerName}</div>
          <div class="caller-number">${this._callerNumber}</div>
          <div class="call-status">${this._callDuration || 'Connected'}</div>
        </div>
        <div class="call-actions">
          <button
            class="action-button hangup"
            @click=${this._endCall}
            title="Hang Up"
          >
            <span class="button-icon">📵</span>
            <span class="button-text">Hang Up</span>
          </button>
        </div>
      </div>
    `;
  }

  private _renderIdle(): TemplateResult {
    return html`
      <div class="idle-state">
        ${this._cameraCard
          ? html`<div id="camera-card-container"></div>`
          : html`<div class="status-icon">📱</div>`}
        <div class="status-text">No Active Calls</div>
        <div class="entity-state">
          Status: ${this._sipCore?.callState || 'idle'}
        </div>
        ${this._config?.call_number
          ? html`
              <div class="call-actions">
                <button
                  class="action-button call"
                  @click=${this._startCall}
                  title="Start Call"
                >
                  <span class="button-icon">📞</span>
                  <span class="button-text"
                    >Call ${this._config.call_number}</span
                  >
                </button>
              </div>
            `
          : ''}
      </div>
    `;
  }

  static styles = css`
    ha-card {
      background: var(--card-background-color);
    }

    .card-content {
      padding: 16px;
    }

    .error {
      color: var(--error-color, #ff0000);
      font-weight: bold;
    }

    .loading {
      color: var(--secondary-text-color);
      text-align: center;
      padding: 16px;
    }

    .incoming-call,
    .active-call,
    .idle-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      position: relative;
    }

    #camera-card-container {
      width: 100%;
      display: block;
    }

    .video-stream,
    .camera-feed {
      width: 100%;
      max-height: 400px;
      border-radius: 8px;
      background: #000;
      object-fit: contain;
    }

    audio {
      display: none;
    }

    .call-icon {
      font-size: 48px;
      animation: ring 1s ease-in-out infinite;
    }

    .call-icon.active {
      animation: pulse 2s ease-in-out infinite;
    }

    .status-icon {
      font-size: 48px;
      opacity: 0.5;
    }

    @keyframes ring {
      0%,
      100% {
        transform: rotate(-10deg);
      }
      50% {
        transform: rotate(10deg);
      }
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
      }
    }

    .call-info {
      text-align: center;
      width: 100%;
    }

    .caller-name {
      font-size: 24px;
      font-weight: bold;
      color: var(--primary-text-color);
      margin-bottom: 4px;
    }

    .caller-number {
      font-size: 16px;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }

    .call-status {
      font-size: 14px;
      color: var(--primary-color);
      font-weight: 500;
    }

    .status-text {
      font-size: 18px;
      color: var(--secondary-text-color);
    }

    .entity-state {
      font-size: 12px;
      color: var(--secondary-text-color);
      opacity: 0.7;
    }

    .call-actions {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      min-width: 100px;
    }

    .button-icon {
      font-size: 24px;
    }

    .button-text {
      font-size: 12px;
    }

    .action-button.answer {
      background: var(--success-color, #4caf50);
      color: white;
    }

    .action-button.answer:hover {
      background: var(--success-color-dark, #45a049);
      transform: scale(1.05);
    }

    .action-button.call {
      background: var(--primary-color, #2196f3);
      color: white;
    }

    .action-button.call:hover {
      background: var(--primary-color-dark, #1976d2);
      transform: scale(1.05);
    }

    .action-button.reject,
    .action-button.hangup {
      background: var(--error-color, #f44336);
      color: white;
    }

    .action-button.reject:hover,
    .action-button.hangup:hover {
      background: var(--error-color-dark, #da190b);
      transform: scale(1.05);
    }

    .action-button:active {
      transform: scale(0.95);
    }
  `;
}
