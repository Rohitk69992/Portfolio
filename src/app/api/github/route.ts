import { NextResponse } from "next/server";
import { getGitHubRepositories } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getGitHubRepositories();
    const repos = result.repos.filter((repo) => repo.name !== "Portfolio");
    return NextResponse.json(
      {
        success: true,
        data: repos,
        source: result.source,
        totalCount: repos.length,
        lastUpdated: result.lastUpdated,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve GitHub repositories.",
      },
      { status: 500 }
    );
  }
}
