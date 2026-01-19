import { useState } from 'react';

interface GrimoireOrbitalProps {
    images: string[];  // Array of manga panel images
    grimoireImage: string;  // Central grimoire book image
    onImageClick?: (imageSrc: string) => void;  // Optional click handler
}

export default function GrimoireOrbital({ images, grimoireImage, onImageClick }: GrimoireOrbitalProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (imageSrc: string) => {
        if (onImageClick) {
            onImageClick(imageSrc);
        } else {
            setSelectedImage(imageSrc);
            setShowModal(true);
        }
    };

    return (
        <>
            {/* GRIMOIRE SECTION - Floating Manga Images */}
            <div className="grimoire-section">
                <div className="grimoire-container">
                    {/* Manga Panels orbiting around the grimoire */}
                    {images.map((imageSrc, index) => (
                        <div
                            key={index}
                            className="manga-panel-float"
                            onClick={() => handleImageClick(imageSrc)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={imageSrc} alt={`Manga Panel ${index + 1}`} />
                        </div>
                    ))}

                    {/* Central Grimoire Book */}
                    <div
                        className="grimoire-book"
                        onClick={() => handleImageClick(grimoireImage)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={grimoireImage} alt="Grimoire" />
                    </div>
                </div>
            </div>

            {/* Grimoire Image Modal */}
            {showModal && (
                <div
                    className="grimoire-modal"
                    onClick={() => setShowModal(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        cursor: 'pointer'
                    }}
                >
                    <img
                        src={selectedImage}
                        alt="Grimoire"
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90vh',
                            objectFit: 'contain',
                            border: '5px solid #fbbf24',
                            boxShadow: '0 0 50px rgba(251, 191, 36, 0.8)',
                            animation: 'grimoireModalPulse 2s ease-in-out infinite'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setShowModal(false)}
                        style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            background: '#fbbf24',
                            border: '3px solid #1a1a1a',
                            color: '#1a1a1a',
                            fontSize: '2rem',
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '4px 4px 0 #1a1a1a',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    );
}
