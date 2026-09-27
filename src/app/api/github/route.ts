import { NextResponse } from "next/server";
import { getGitHubRepositories } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getGitHubRepositories();
    return NextResponse.json({
      success: true,
      data: result.repos,
      source: result.source,
      totalCount: result.totalCount,
      lastUpdated: result.lastUpdated,
    });
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
