import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { runAnalysisPipeline } from "@/services/projects.service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: RouteParams) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const project = await runAnalysisPipeline(id, user.id);
    return NextResponse.json(project);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Analysis failed" },
      { status: 500 }
    );
  }
}
