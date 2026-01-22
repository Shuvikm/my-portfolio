import { Github } from 'lucide-react';
import GlitchText from '../ui/GlitchText';

export default function GitHubActivity() {
    const username = 'Shuvikm';

    return (
        <section id="github-activity" className="manga-section">
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

            {/* Contribution Graph */}
            <div className="manga-panel p-6 sm:p-8">
                <h3 className="manga-subtitle text-lg sm:text-xl mb-6">Contribution Activity</h3>
                <div className="flex justify-center overflow-x-auto pb-4">
                    <img
                        src={`https://ghchart.rshah.org/fbbf24/Shuvikm`}
                        alt="GitHub Contribution Chart"
                        className="w-full max-w-4xl shadow-md rounded-lg"
                    />
                </div>

                {/* View Profile Link */}
                <div className="mt-6 text-center">
                    <a
                        href={`https://github.com/${username}`}
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
}
