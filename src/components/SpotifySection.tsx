import { useEffect, useState } from 'react';
import { Music, Headphones, ExternalLink, Play } from 'lucide-react';

interface SpotifyTrack {
    name: string;
    artist: string;
    album: string;
    albumArt: string;
    url: string;
    isPlaying?: boolean;
}

// Demo track data - Replace with your actual Spotify tracks or connect to API
const recentTracks: SpotifyTrack[] = [
    {
        name: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        albumArt: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
        url: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b',
    },
    {
        name: 'Starboy',
        artist: 'The Weeknd ft. Daft Punk',
        album: 'Starboy',
        albumArt: 'https://i.scdn.co/image/ab67616d0000b27382b243023e7f8e2a9e0fc7ec',
        url: 'https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB',
    },
    {
        name: 'Heat Waves',
        artist: 'Glass Animals',
        album: 'Dreamland',
        albumArt: 'https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464',
        url: 'https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx',
    },
    {
        name: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        albumArt: 'https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946',
        url: 'https://open.spotify.com/track/39LLxExYz6ewLAcYrzQQyP',
    },
];

export default function SpotifySection() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-rotate through tracks
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentTrack((prev) => (prev + 1) % recentTracks.length);
                setIsAnimating(false);
            }, 300);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const track = recentTracks[currentTrack];

    return (
        <div className="manga-panel p-0 mb-4 overflow-hidden hover-effect">
            {/* Header */}
            <div className="bg-[#1DB954] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-white" />
                    <span className="font-black text-white uppercase text-sm">Now Vibing</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
            </div>

            {/* Current Track Display */}
            <div className="p-4 flex gap-4 items-center">
                {/* Album Art */}
                <div className={`relative flex-shrink-0 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                    <img
                        src={track.albumArt}
                        alt={track.album}
                        className="w-20 h-20 object-cover border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Track Info - Manga Panel Style */}
                <div className={`flex-1 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <div className="manga-dialogue-box p-3">
                        <div className="flex items-start gap-2">
                            <Music className="w-4 h-4 text-[#1DB954] flex-shrink-0 mt-1" />
                            <div className="min-w-0">
                                <p className="font-black text-[#1a1a1a] text-sm truncate">{track.name}</p>
                                <p className="text-xs text-[#4a4a4a] truncate">{track.artist}</p>
                                <p className="text-xs text-[#4a4a4a] opacity-60 truncate">{track.album}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Tracks */}
            <div className="px-4 pb-4">
                <p className="text-xs font-bold text-[#4a4a4a] uppercase mb-2">Recent Tracks</p>
                <div className="grid grid-cols-4 gap-2">
                    {recentTracks.map((t, i) => (
                        <a
                            key={i}
                            href={t.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative group ${currentTrack === i ? 'ring-2 ring-[#1DB954]' : ''}`}
                        >
                            <img
                                src={t.albumArt}
                                alt={t.name}
                                className="w-full aspect-square object-cover border-2 border-[#1a1a1a] transition-transform group-hover:scale-105"
                            />
                            {/* Popup on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                                <div className="manga-dialogue-box p-2 whitespace-nowrap text-xs">
                                    <p className="font-bold">{t.name}</p>
                                    <p className="text-[#4a4a4a]">{t.artist}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Spotify Link */}
            <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#1a1a1a] px-4 py-3 text-center hover:bg-[#2a2a2a] transition-colors"
            >
                <span className="text-[#1DB954] font-bold text-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Open Spotify
                    <ExternalLink className="w-4 h-4" />
                </span>
            </a>
        </div>
    );
}
