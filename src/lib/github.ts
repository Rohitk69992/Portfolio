import { GitHubRepo } from "./types";
import { FALLBACK_REPOSITORIES } from "@/data/fallback-repos";

const GITHUB_USERNAME = "Rohitk69992";
const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

export interface FetchReposResult {
  repos: GitHubRepo[];
  source: "live" | "fallback";
  totalCount: number;
  lastUpdated: string;
}

// Fallback repositories with exact exclusion for "Portfolio"
const safeFallbackRepositories: GitHubRepo[] = FALLBACK_REPOSITORIES.filter(
  (repo) => repo.name !== "Portfolio"
);

export async function getGitHubRepositories(): Promise<FetchReposResult> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Rohit-Portfolio-App",
  };

  // Optional authenticated token for higher rate limits if provided via server env
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(GITHUB_REPOS_API, {
      headers,
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });

    if (!response.ok) {
      console.warn(
        `[GitHub API Warning] Status: ${response.status} ${response.statusText}. Using fallback snapshot.`
      );
      return {
        repos: safeFallbackRepositories,
        source: "fallback",
        totalCount: safeFallbackRepositories.length,
        lastUpdated: new Date().toISOString(),
      };
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.warn("[GitHub API Warning] Response was not an array. Using fallback snapshot.");
      return {
        repos: safeFallbackRepositories,
        source: "fallback",
        totalCount: safeFallbackRepositories.length,
        lastUpdated: new Date().toISOString(),
      };
    }

    // Normalize and exclude repository where repo.name === "Portfolio"
    const normalized: GitHubRepo[] = data
      .filter((repo): repo is Record<string, unknown> => typeof repo === "object" && repo !== null)
      .map((item) => ({
        id: Number(item.id) || 0,
        name: String(item.name || "unnamed-repo"),
        full_name: String(item.full_name || ""),
        description: typeof item.description === "string" ? item.description : null,
        html_url: String(item.html_url || `https://github.com/${GITHUB_USERNAME}`),
        language: typeof item.language === "string" ? item.language : null,
        stargazers_count: Number(item.stargazers_count) || 0,
        forks_count: Number(item.forks_count) || 0,
        updated_at: String(item.updated_at || new Date().toISOString()),
        pushed_at: String(item.pushed_at || new Date().toISOString()),
        topics: Array.isArray(item.topics) ? item.topics.map(String) : [],
        homepage: typeof item.homepage === "string" && item.homepage.trim() !== "" ? item.homepage : null,
        visibility: String(item.visibility || "public"),
        archived: Boolean(item.archived),
        default_branch: String(item.default_branch || "main"),
      }))
      .filter((repo) => repo.name !== "Portfolio")
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

    return {
      repos: normalized.length > 0 ? normalized : safeFallbackRepositories,
      source: "live",
      totalCount: normalized.length,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[GitHub API Error] Failed to fetch repositories:", error);
    return {
      repos: safeFallbackRepositories,
      source: "fallback",
      totalCount: safeFallbackRepositories.length,
      lastUpdated: new Date().toISOString(),
    };
  }
}
