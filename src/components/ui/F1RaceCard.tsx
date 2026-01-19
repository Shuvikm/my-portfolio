import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function F1RaceCard() {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            {/* Close button */}
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="absolute -left-10 top-1/2 -translate-y-1/2 bg-black hover:bg-gray-900 text-white p-2 rounded-l-lg transition-all duration-300 shadow-lg border border-fuchsia-500/50"
            >
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${!isVisible ? 'rotate-180' : ''}`} />
            </button>

            {/* F1 Race Card - Broadcast Style */}
            <div className="relative group">
                {/* Neon glow effect */}
                <div className="absolute -inset-2 bg-fuchsia-500 rounded-xl blur-2xl opacity-30 group-hover:opacity-50 animate-pulse"></div>

                {/* Card container */}
                <div className="relative bg-black/95 backdrop-blur-sm border-2 border-fuchsia-500/40 rounded-xl overflow-hidden w-80 shadow-2xl animate-float">

                    {/* Top accent line */}
                    <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-pink-400 to-fuchsia-500"></div>

                    {/* Card content */}
                    <div className="p-6">

                        {/* Next Race Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #a3e635' }}></div>
                                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Next Race</span>
                            </div>
                        </div>

                        {/* Track Visualization with Neon Glow */}
                        <div className="relative h-32 mb-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg p-4 border border-fuchsia-500/20">
                            {/* Glowing track outline */}
                            <svg
                                viewBox="0 0 200 100"
                                className="w-full h-full"
                                style={{ filter: 'drop-shadow(0 0 8px rgba(217, 70, 239, 0.6))' }}
                            >
                                {/* Australia/Melbourne track shape approximation */}
                                <path
                                    d="M 40,50 Q 40,20 70,20 L 130,20 Q 160,20 160,50 L 160,60 Q 160,80 130,80 L 70,80 Q 40,80 40,60 Z"
                                    stroke="#d946ef"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-draw-path"
                                    opacity="0.8"
                                />
                                {/* Inner track line */}
                                <path
                                    d="M 50,50 Q 50,30 70,30 L 130,30 Q 150,30 150,50 L 150,60 Q 150,70 130,70 L 70,70 Q 50,70 50,60 Z"
                                    stroke="#ec4899"
                                    strokeWidth="1.5"
                                    fill="none"
                                    opacity="0.4"
                                />
                                {/* Start/Finish line with glow */}
                                <line
                                    x1="40" y1="45" x2="40" y2="55"
                                    stroke="#fbbf24"
                                    strokeWidth="4"
                                    className="animate-pulse"
                                    style={{ filter: 'drop-shadow(0 0 6px #fbbf24)' }}
                                />
                            </svg>

                            {/* Pulsing dot on track */}
                            <div
                                className="absolute top-1/2 left-[20%] w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse"
                                style={{ boxShadow: '0 0 12px #d946ef' }}
                            ></div>
                        </div>

                        {/* Race Name */}
                        <div className="mb-6">
                            <div className="text-5xl font-black text-white uppercase tracking-tighter mb-1" style={{ textShadow: '0 0 20px rgba(217, 70, 239, 0.5)' }}>
                                JAPAN
                            </div>
                            <div className="text-sm text-gray-400 font-semibold tracking-wide">SUZUKA CIRCUIT</div>
                        </div>

                        {/* F1 Data Display - Broadcast Style */}
                        <div className="space-y-3">
                            {/* Driver/Position info */}
                            <div className="flex items-center justify-between bg-gradient-to-r from-fuchsia-500/20 to-transparent border-l-4 border-fuchsia-500 pl-3 pr-4 py-2">
                                <span className="text-xs text-gray-400 font-bold uppercase">Driver</span>
                                <span className="text-lg font-black text-fuchsia-400" style={{ textShadow: '0 0 10px rgba(217, 70, 239, 0.8)' }}>HAM</span>
                            </div>

                            {/* Number */}
                            <div className="flex items-center justify-between bg-gradient-to-r from-fuchsia-500/20 to-transparent border-l-4 border-fuchsia-500 pl-3 pr-4 py-2">
                                <span className="text-xs text-gray-400 font-bold uppercase">No.</span>
                                <span className="text-lg font-black text-fuchsia-400" style={{ textShadow: '0 0 10px rgba(217, 70, 239, 0.8)' }}>44</span>
                            </div>

                            {/* Sector times */}
                            <div className="grid grid-cols-3 gap-2 pt-2">
                                <div className="bg-black/50 border border-fuchsia-500/30 rounded px-2 py-2 text-center">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">S1</div>
                                    <div className="text-sm font-black text-fuchsia-400" style={{ textShadow: '0 0 8px rgba(217, 70, 239, 0.6)' }}>26.666</div>
                                </div>
                                <div className="bg-black/50 border border-fuchsia-500/30 rounded px-2 py-2 text-center">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">S2</div>
                                    <div className="text-sm font-black text-fuchsia-400" style={{ textShadow: '0 0 8px rgba(217, 70, 239, 0.6)' }}>26.180</div>
                                </div>
                                <div className="bg-black/50 border border-fuchsia-500/30 rounded px-2 py-2 text-center">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">S3</div>
                                    <div className="text-sm font-black text-fuchsia-400" style={{ textShadow: '0 0 8px rgba(217, 70, 239, 0.6)' }}>18.187</div>
                                </div>
                            </div>

                            {/* Total time */}
                            <div className="bg-gradient-to-r from-fuchsia-500/30 via-fuchsia-500/20 to-transparent border-2 border-fuchsia-500 rounded-lg px-4 py-3 mt-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Time</span>
                                    <span className="text-2xl font-black text-fuchsia-400" style={{ textShadow: '0 0 15px rgba(217, 70, 239, 1)' }}>1:08.933</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom status */}
                        <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-fuchsia-500/20">
                            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 10px #a3e635' }}></div>
                            <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">Season Mode</span>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-fuchsia-500 via-pink-400 to-fuchsia-500"></div>
                </div>
            </div>
        </div>
    );
}
