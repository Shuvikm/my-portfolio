import { X, Download } from 'lucide-react';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
            onClick={onClose}
            style={{ overflowY: 'scroll' }}
        >
            {/* Close/Back button - fixed position */}
            <button
                onClick={onClose}
                className="fixed top-4 left-4 z-[60] p-3 bg-[#dc2626] hover:bg-[#fbbf24] text-white hover:text-[#1a1a1a] rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2 font-bold"
            >
                <X className="w-6 h-6" />
                <span className="hidden sm:inline">BACK</span>
            </button>

            {/* Download button */}
            <a
                href="/resume.pdf"
                download="Shuvik_M_Resume.pdf"
                className="fixed top-4 right-4 z-[60] p-3 bg-[#fbbf24] hover:bg-[#dc2626] text-[#1a1a1a] hover:text-white rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2 font-bold"
            >
                <Download className="w-6 h-6" />
                <span className="hidden sm:inline">PDF</span>
            </a>

            {/* Scrollable content */}
            <div
                className="min-h-screen flex flex-col items-center py-20 px-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title at top */}
                <h3 className="text-2xl font-black text-[#fbbf24] mb-4">SHUVIK M - RESUME</h3>

                {/* Resume image - full size */}
                <div className="manga-panel bg-white p-4 max-w-4xl w-full">
                    <img
                        src="/resume.png"
                        alt="Shuvik M Resume"
                        className="w-full h-auto"
                    />
                </div>

                {/* Scroll hint at bottom */}
                <div className="mt-4 text-white/70 text-sm text-center">
                    ↕ Scroll to see full resume • Click BACK or press ESC to close
                </div>
            </div>
        </div>
    );
}
