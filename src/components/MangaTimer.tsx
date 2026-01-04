import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function MangaTimer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getMessage = () => {
        if (seconds < 30) return "Just started!";
        if (seconds < 60) return "Getting into it...";
        if (seconds < 120) return "Really engaged!";
        if (seconds < 300) return "True reader!";
        return "LEGENDARY!";
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 hidden sm:block">
            <div
                className="bg-[#1a1a1a] border-3 border-[#fbbf24] shadow-lg"
                style={{
                    borderWidth: '3px',
                    boxShadow: '4px 4px 0 #fbbf24'
                }}
            >
                {/* Compact Timer */}
                <div className="px-4 py-2 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#fbbf24]" />
                    <div className="text-center">
                        <div className="text-[#fbbf24] font-black text-lg tracking-wider">
                            {formatTime()}
                        </div>
                        <div className="text-white text-[10px] font-bold uppercase">
                            {getMessage()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
