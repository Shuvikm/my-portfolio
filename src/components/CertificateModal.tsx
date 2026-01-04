import { X } from 'lucide-react';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    title: string;
}

export default function CertificateModal({ isOpen, onClose, imageSrc, title }: CertificateModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
            onClick={onClose}
            style={{ overflowY: 'scroll' }}
        >
            {/* Close button - fixed position */}
            <button
                onClick={onClose}
                className="fixed top-4 right-4 z-[60] p-3 bg-[#dc2626] hover:bg-[#fbbf24] text-white hover:text-[#1a1a1a] rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2 font-bold"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Scrollable content */}
            <div
                className="min-h-screen flex flex-col items-center py-8 px-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title at top */}
                <h3 className="text-2xl font-black text-[#fbbf24] mb-4">{title}</h3>

                {/* Certificate image - full size */}
                <div className="manga-panel bg-white p-4 max-w-4xl w-full">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-auto"
                    />
                </div>

                {/* Scroll hint at bottom */}
                <div className="mt-4 text-white/70 text-sm text-center">
                    ↕ Scroll to see full certificate • Click anywhere to close
                </div>
            </div>
        </div>
    );
}
