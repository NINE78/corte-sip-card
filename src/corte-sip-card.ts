import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

interface SipCardConfig extends LovelaceCardConfig {
  name?: string;
  call_number?: string;
  camera_entity?: string;
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

@customElement('corte-sip-card')
export class CorteSipCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: SipCardConfig;
  @state() private _sipCore?: SipCore;
  @state() private _isInitializing = true;
  @state() private _cameraStreamUrl?: string;
  @state() private _useWebRTC = false;
  private _initTimeout?: number;
  private _hls?: any;
  private _webrtcPeerConnection?: RTCPeerConnection;

  public setConfig(config: SipCardConfig): void {
    this._config = config;
    if (config.camera_entity && this.hass) {
      this._setupCameraStream();
    }
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
    
    // Setup camera stream if configured
    if (this._config?.camera_entity) {
      this._setupCameraStream();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('sipcore-update', this._updateHandler);
    if (this._initTimeout) {
      clearTimeout(this._initTimeout);
    }
    this._cleanupCameraStream();
  }

  updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    
    // Initialize HLS player when camera stream URL is set (and not using WebRTC)
    if (changedProperties.has('_cameraStreamUrl') && this._cameraStreamUrl && !this._useWebRTC) {
      setTimeout(() => this._initHLSPlayer(), 0);
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

  private async _setupCameraStream(): Promise<void> {
    if (!this._config?.camera_entity || !this.hass) return;
    
    // Try WebRTC first for lower latency
    const webrtcSuccess = await this._tryWebRTC();
    if (webrtcSuccess) return;
    
    // Fall back to HLS
    await this._tryHLS();
  }

  private async _tryWebRTC(): Promise<boolean> {
    if (!this._config?.camera_entity || !this.hass) return false;
    
    try {
      // Request WebRTC connection
      const result = await this.hass.callWS<any>({
        type: 'camera/web_rtc_offer',
        entity_id: this._config.camera_entity,
        offer: await this._createWebRTCOffer(),
      });
      
      if (!result || !result.answer) {
        return false;
      }
      
      // Set remote description with the answer
      await this._webrtcPeerConnection!.setRemoteDescription(
        new RTCSessionDescription({ type: 'answer', sdp: result.answer })
      );
      
      this._useWebRTC = true;
      this.requestUpdate();
      return true;
    } catch (error) {
      console.log('WebRTC not available, falling back to HLS:', error);
      this._cleanupWebRTC();
      return false;
    }
  }

  private async _createWebRTCOffer(): Promise<string> {
    // Create peer connection
    this._webrtcPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    
    // Handle incoming tracks
    this._webrtcPeerConnection.ontrack = (event) => {
      const videoElement = this.shadowRoot?.getElementById('camera-stream') as HTMLVideoElement;
      if (videoElement && event.streams[0]) {
        videoElement.srcObject = event.streams[0];
      }
    };
    
    // Add transceiver for receiving video
    this._webrtcPeerConnection.addTransceiver('video', { direction: 'recvonly' });
    this._webrtcPeerConnection.addTransceiver('audio', { direction: 'recvonly' });
    
    // Create and return offer
    const offer = await this._webrtcPeerConnection.createOffer();
    await this._webrtcPeerConnection.setLocalDescription(offer);
    
    return offer.sdp!;
  }

  private async _tryHLS(): Promise<void> {
    if (!this._config?.camera_entity || !this.hass) return;
    
    try {
      // Request HLS stream from Home Assistant
      const result = await this.hass.callWS<{ url: string }>({
        type: 'camera/stream',
        entity_id: this._config.camera_entity,
      });
      
      this._cameraStreamUrl = result.url;
      this._useWebRTC = false;
      this.requestUpdate();
      
      // Setup HLS player after render
      setTimeout(() => this._initHLSPlayer(), 100);
    } catch (error) {
      console.error('Failed to get camera stream:', error);
      this._cameraStreamUrl = undefined;
    }
  }

  private _initHLSPlayer(): void {
    if (this._useWebRTC) return; // Don't init HLS if using WebRTC
    
    const videoElement = this.shadowRoot?.getElementById('camera-stream') as HTMLVideoElement;
    if (!videoElement || !this._cameraStreamUrl) return;

    // Check if browser supports HLS natively (Safari)
    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = this._cameraStreamUrl;
    } else {
      // Use hls.js for other browsers
      this._loadHLSLibrary().then(() => {
        if ((window as any).Hls?.isSupported()) {
          this._hls = new (window as any).Hls();
          this._hls.loadSource(this._cameraStreamUrl!);
          this._hls.attachMedia(videoElement);
        }
      });
    }
  }

  private async _loadHLSLibrary(): Promise<void> {
    if ((window as any).Hls) return;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  private _cleanupCameraStream(): void {
    this._cleanupWebRTC();
    if (this._hls) {
      this._hls.destroy();
      this._hls = undefined;
    }
    this._cameraStreamUrl = undefined;
    this._useWebRTC = false;
  }

  private _cleanupWebRTC(): void {
    if (this._webrtcPeerConnection) {
      this._webrtcPeerConnection.close();
      this._webrtcPeerConnection = undefined;
    }
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
        ${this._useWebRTC || this._cameraStreamUrl
          ? html`
              <video
                id="camera-stream"
                class="camera-feed"
                autoplay
                muted
                playsinline
              ></video>
            `
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
          : this._useWebRTC || this._cameraStreamUrl
            ? html`
                <video
                  id="camera-stream"
                  class="camera-feed"
                  autoplay
                  muted
                  playsinline
                ></video>
              `
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
        ${this._useWebRTC || this._cameraStreamUrl
          ? html`
              <video
                id="camera-stream"
                class="camera-feed"
                autoplay
                muted
                playsinline
              ></video>
            `
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
