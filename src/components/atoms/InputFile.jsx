import React, { useState, useRef } from 'react';
import '../../styles/pages/admin.css';

function InputFile({ onChange, accept = "image/*", className = "", disabled = false, preview = null }) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (disabled) return;
        
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onChange({ target: { files: files, name: 'imageUrl' } });
        }
    };

    // --- Vista Previa ---
    if (preview) {
        return (
            <div className={`titan-preview-wrapper ${className}`}>
                <div className="titan-preview-box">
                    <img src={preview} alt="Vista previa" className="titan-preview-img" />
                    {!disabled && (
                        <button
                            type="button"
                            onClick={() => inputRef.current.click()}
                            className="titan-btn-change"
                        >
                            Cambiar Imagen
                        </button>
                    )}
                </div>
                <input 
                    type="file" 
                    accept={accept} 
                    ref={inputRef} 
                    onChange={onChange} 
                    style={{ display: 'none' }} 
                />
            </div>
        );
    }

    return (
        <div className={className} style={{ width: '100%' }}>
            <div 
                className={`titan-dropzone-container ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input 
                    type="file" 
                    accept={accept} 
                    onChange={onChange} 
                    disabled={disabled} 
                    ref={inputRef} 
                    className="titan-file-input-hidden"
                />

                <svg className="titan-dropzone-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                
                <p className="titan-dropzone-text">
                    {disabled ? "Subiendo..." : "Haz click o arrastra tu imagen aquí"}
                </p>
                <p className="titan-dropzone-subtext">
                    (Soporta JPG, PNG, WEBP)
                </p>
            </div>
        </div>
    );
}

export default InputFile;