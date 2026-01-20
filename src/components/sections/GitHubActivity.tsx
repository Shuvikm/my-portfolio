import { useEffect, useState } from 'react';
import { Github, Star, GitFork } from 'lucide-react';
import Shuffle from '../ui/Shuffle';

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

interface GitHubStats {
    public_repos: number;
    followers: number;
    following: number;
}

export default function GitHubActivity() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const username = 'Shuvikm';

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                setLoading(true);

                // Fetch user stats
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                if (!userResponse.ok) throw new Error('Failed to fetch GitHub user data');
                const userData = await userResponse.json();
                setStats({
                    public_repos: userData.public_repos,
                    followers: userData.followers,
                    following: userData.following
                });

                // Fetch repositories (top 6 most recent)
                const reposResponse = await fetch(
                    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
                );
                if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
                const reposData = await reposResponse.json();
                setRepos(reposData);

                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
                console.error('GitHub API error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, [username]);

    if (loading) {
        return (
            <section id="github-activity" className="manga-section">
                <div className="manga-panel p-8">
                    <div className="flex items-center justify-center">
                        <div className="text-xl">Loading GitHub activity...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="github-activity" className="manga-section">
                <div className="manga-panel p-8">
                    <div className="text-center text-red-500">
                        <p>⚠️ {error}</p>
                        <p className="text-sm mt-2">Showing cached data or check connection</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="github-activity" className="manga-section">
            {/* Section Header */}
            <div className="manga-panel p-8 mb-4">
                <div className="flex items-center gap-8">
                    <div className="exclaim-box" style={{ background: '#fbbf24', color: '#1a1a1a' }}>
                        <Github className="w-6 h-6" />
                    </div>
                    <Shuffle
                        text="GITHUB ACTIVITY"
                        tag="h2"
                        className="manga-title text-3xl sm:text-4xl tracking-widest"
                        shuffleDirection="right"
                        duration={0.4}
                        stagger={0.03}
                    />
                </div>
            </div>

            {/* GitHub Stats */}
            {stats && (
                <div className="panel-grid panel-grid-3 mb-4">
                    <div className="manga-panel p-6 text-center">
                        <div className="text-4xl font-black text-[#fbbf24] mb-2">{stats.public_repos}</div>
                        <div className="text-sm font-bold">Repositories</div>
                    </div>
                    <div className="manga-panel p-6 text-center">
                        <div className="text-4xl font-black text-[#fbbf24] mb-2">{stats.followers}</div>
                        <div className="text-sm font-bold">Followers</div>
                    </div>
                    <div className="manga-panel p-6 text-center">
                        <div className="text-4xl font-black text-[#fbbf24] mb-2">{stats.following}</div>
                        <div className="text-sm font-bold">Following</div>
                    </div>
                </div>
            )}

            {/* Recent Repositories */}
            <div className="manga-panel manga-panel-dark p-6 sm:p-8 mb-4">
                <Shuffle
                    text="Recent Repositories"
                    tag="h3"
                    className="manga-subtitle text-lg mb-6"
                    shuffleDirection="right"
                    duration={0.4}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.map((repo) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="manga-panel p-4 hover:border-[#fbbf24] transition-all duration-300 group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-black text-lg group-hover:text-[#fbbf24] transition-colors">
                                    {repo.name}
                                </h4>
                                <Github className="w-5 h-5 text-[#fbbf24]" />
                            </div>

                            {repo.description && (
                                <p className="text-sm text-[#4a4a4a] mb-3 line-clamp-2">
                                    {repo.description}
                                </p>
                            )}

                            <div className="flex items-center gap-4 text-xs">
                                {repo.language && (
                                    <span className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                                        {repo.language}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1">
                                    <GitFork className="w-3 h-3" />
                                    {repo.forks_count}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-6 text-center">
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="manga-button inline-flex items-center gap-2"
                    >
                        <Github className="w-5 h-5" />
                        View All Repositories
                    </a>
                </div>
            </div>

            {/* GitHub Contribution Graph Embed */}
            <div className="manga-panel p-6">
                <Shuffle
                    text="Contribution Activity"
                    tag="h3"
                    className="manga-subtitle text-lg mb-4"
                    shuffleDirection="right"
                    duration={0.4}
                />
                <div className="flex justify-center">
                    <img
                        src={`https://ghchart.rshah.org/${username}`}
                        alt="GitHub Contribution Chart"
                        className="w-full max-w-4xl"
                        style={{ filter: 'grayscale(0%)' }}
                    />
                </div>
            </div>
        </section>
    );
}
