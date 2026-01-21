// Shared TypeScript type definitions

export interface MenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}

export interface SocialItem {
    label: string;
    link: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    updated_at: string;
}

export interface GitHubStats {
    public_repos: number;
    followers: number;
    following: number;
}
