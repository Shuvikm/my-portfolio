import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Eye } from 'lucide-react';

export default function PortfolioTimer() {
    const [isVisible, setIsVisible] = useState(true);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            {/* Close button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="absolute -left-10 top-1/2 -translate-y-1/2 bg-black hover:bg-gray-900 text-white p-2 rounded-l-lg transition-all duration-300 shadow-lg border border-manga-red/50"
            >
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${!isVisible ? 'rotate-180' : ''}`} />
            </button>

            {/* Timer Card */}
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-manga-red rounded-xl blur-xl opacity-40 group-hover:opacity-60 animate-pulse"></div>

                {/* Card container */}
                <div className="relative bg-black/95 backdrop-blur-sm border-2 border-manga-red/60 rounded-xl overflow-hidden w-64 shadow-2xl">

                    {/* Top accent line */}
                    <div className="h-1 bg-gradient-to-r from-manga-red via-manga-accent to-manga-red"></div>

                    {/* Card content */}
                    <div className="p-5">

                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <Eye className="w-5 h-5 text-manga-accent" />
                            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Viewing Time</span>
                        </div>

                        {/* Timer Display */}
                        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-manga-red/40 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-center gap-3">
                                <Clock className="w-6 h-6 text-manga-accent animate-pulse" />
                                <div className="text-4xl font-black text-manga-accent tabular-nums" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.8)' }}>
                                    {formatTime(seconds)}
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Minutes : Seconds</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-manga-red/20 border border-manga-red/40 rounded px-3 py-2">
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Sessions</div>
                                <div className="text-lg font-black text-manga-red">01</div>
                            </div>
                            <div className="bg-manga-accent/20 border border-manga-accent/40 rounded px-3 py-2">
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Active</div>
                                <div className="text-lg font-black text-manga-accent">LIVE</div>
                            </div>
                        </div>

                        {/* Footer message */}
                        <div className="mt-4 pt-3 border-t border-manga-red/20 text-center">
                            <p className="text-xs text-gray-400">Thanks for visiting! 🎯</p>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-manga-red via-manga-accent to-manga-red"></div>
                </div>
            </div>
        </div>
    );
}
