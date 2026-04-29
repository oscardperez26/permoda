import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

interface Props {
  onSearch: (code: string) => void;
}

const ScannerInput: React.FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
      setValue('');
    }
  };

  const startCamera = async () => {
    setCameraError('');
    setShowCamera(true);
  };

  useEffect(() => {
    if (!showCamera || !videoRef.current) return;

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    reader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
      if (result) {
        const code = result.getText();
        stopCamera();
        onSearch(code);
      }
      if (err && !(err.message?.includes('No MultiFormat'))) {
        // ignore continuous not-found errors
      }
    }).catch(() => {
      setCameraError('No se pudo acceder a la cámara. Verifica los permisos.');
    });

    return () => { stopCamera(); };
  }, [showCamera]);

  const stopCamera = () => {
    readerRef.current?.reset();
    readerRef.current = null;
    setShowCamera(false);
  };

  return (
    <section>
      {/* ── Hero ── */}
      <div className="hero">
        <p className="hero-eyebrow">Validador oficial</p>
        <h1 className="hero-title">Validador</h1>
        <p className="hero-desc">
          Ingresa un código válido o escanea un producto para verificar su información y precio.
        </p>
      </div>

      {/* ── Input row ── */}
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <span className="input-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4h2v16H2V4zm3 0h1v16H5V4zm2 0h2v16H7V4zm3 0h1v16h-1V4zm2 0h2v16h-2V4zm3 0h1v16h-1V4zm2 0h3v16h-3V4z"/>
            </svg>
          </span>
          <input
            className="scanner-input"
            type="text"
            placeholder="Escanea o escribe el código"
            value={value}
            inputMode="numeric"
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <button className="btn-validate" type="submit">
            <span>Validar</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
              <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
            </svg>
          </button>
        </div>
      </form>

      {/* ── Divider ── */}
      <div className="divider">
        <div className="divider-line" />
        <span className="divider-text">o</span>
        <div className="divider-line" />
      </div>

      {/* ── Camera button ── */}
      <button className="btn-camera" onClick={startCamera} type="button">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path d="M9 3L7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
        Usar cámara para escanear
      </button>

      {/* ── Security badge ── */}
      <div className="security-badge">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor">
          <path d="M12 1l9 4v6c0 5.25-3.83 10.15-9 11.35C6.83 21.15 3 16.25 3 11V5l9-4zm0 2.236L5 6.4V11c0 4.25 2.98 8.2 7 9.45 4.02-1.25 7-5.2 7-9.45V6.4L12 3.236zM10.5 14l-3-3 1.06-1.06L10.5 11.88l4.94-4.94L16.5 8 10.5 14z"/>
        </svg>
        <span>Tus datos están protegidos</span>
      </div>

      {/* ── Camera modal ── */}
      {showCamera && (
        <div className="camera-modal-overlay" onClick={stopCamera}>
          <div className="camera-modal" onClick={(e) => e.stopPropagation()}>
            <div className="camera-modal-header">
              <span className="camera-modal-title">Escanear código</span>
              <button className="btn-close" onClick={stopCamera}>×</button>
            </div>
            <video ref={videoRef} className="camera-video" autoPlay muted playsInline />
            <p className="camera-hint">
              {cameraError || 'Apunta la cámara al código de barras del producto'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScannerInput;
