import { useEffect, useRef, useState, memo } from 'react';
import { Github, Star, GitFork, Users, BookOpen, Code2 } from 'lucide-react';
import GlitchText from '../ui/GlitchText';

const USERNAME = 'Shuvikm';

interface GitHubStats {
    username: string;
    followers: number;
    public_repos: number;
    total_stars: number;
    total_forks: number;
    top_languages: string;
    latest_repo: string;
    updated_at: string;
}

const StatCard = ({ icon: Icon, label, value, color }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    color: string;
}) => (
    <div className="manga-panel p-4 flex items-center gap-3 hover:shadow-[4px_4px_0_#1a1a1a] transition-all">
        <div className="p-2 rounded" style={{ background: color }}>
            <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
            <div className="text-xl font-black text-[#1a1a1a]">{value}</div>
            <div className="text-xs font-bold uppercase text-[#4a4a4a]">{label}</div>
        </div>
    </div>
);

const GitHubActivity = memo(function GitHubActivity() {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const [stats, setStats] = useState<GitHubStats | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Fetch stats once section comes into view
    useEffect(() => {
        if (!inView) return;
        fetch('/github-stats.json')
            .then(r => r.json())
            .then(setStats)
            .catch(() => null);
    }, [inView]);

    const languages = stats?.top_languages
        ? stats.top_languages.split(',').map(l => l.trim()).filter(Boolean)
        : [];

    const updatedDate = stats?.updated_at
        ? new Date(stats.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        : null;

    return (
        <section id="github-activity" className="manga-section" ref={sectionRef}>
            {/* Section Header */}
            <div className="manga-panel p-8 mb-4">
                <div className="flex items-center gap-8">
                    <div className="exclaim-box" style={{ background: '#fbbf24', color: '#1a1a1a' }}>
                        <Github className="w-6 h-6" />
                    </div>
                    <h2 className="manga-title text-3xl sm:text-4xl tracking-widest">
                        <GlitchText speed={0.8} enableOnHover={false}>GITHUB ACTIVITY</GlitchText>
                    </h2>
                </div>
            </div>

            {/* Live Stats Cards */}
            {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <StatCard icon={BookOpen} label="Repos" value={stats.public_repos} color="#1a1a1a" />
                    <StatCard icon={Star} label="Stars" value={stats.total_stars} color="#dc2626" />
                    <StatCard icon={GitFork} label="Forks" value={stats.total_forks} color="#2563eb" />
                    <StatCard icon={Users} label="Followers" value={stats.followers} color="#16a34a" />
                </div>
            )}

            {/* Top Languages */}
            {languages.length > 0 && (
                <div className="manga-panel p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-4 h-4 text-[#fbbf24]" />
                        <span className="font-black uppercase text-sm text-[#1a1a1a]">Top Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {languages.map(lang => (
                            <span key={lang} className="px-3 py-1 text-xs font-bold border-2 border-[#1a1a1a] uppercase bg-[#fbbf24] text-[#1a1a1a]">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Contribution Graph */}
            <div className="manga-panel p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="manga-subtitle text-lg sm:text-xl">Contribution Activity</h3>
                    {updatedDate && (
                        <span className="text-xs text-[#4a4a4a] font-bold">Updated {updatedDate}</span>
                    )}
                </div>
                <div className="flex justify-center overflow-x-auto pb-4">
                    {inView ? (
                        <img
                            src={`https://ghchart.rshah.org/fbbf24/${USERNAME}`}
                            alt="GitHub Contribution Chart"
                            loading="lazy"
                            decoding="async"
                            width={800}
                            height={128}
                            className="w-full max-w-4xl shadow-md rounded-lg"
                        />
                    ) : (
                        <div className="w-full max-w-4xl h-32 bg-[#1a1a1a] animate-pulse rounded-lg" />
                    )}
                </div>

                {/* View Profile Link */}
                <div className="mt-6 text-center">
                    <a
                        href={`https://github.com/${USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manga-button inline-flex items-center gap-2"
                    >
                        <Github className="w-5 h-5" />
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </section>
    );
});

export default GitHubActivity;
