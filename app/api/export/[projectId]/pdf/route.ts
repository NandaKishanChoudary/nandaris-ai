import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { getProjectById } from "@/services/projects.service";
import { generateProjectPDF } from "@/services/pdf.service";

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = await params;
    const project = await getProjectById(projectId, user.id);

    if (!project || project.status !== "complete") {
      return NextResponse.json({ error: "Report not available" }, { status: 404 });
    }

    const pdfBuffer = await generateProjectPDF(project);
    const filename = `${project.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-report.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PDF generation failed" },
      { status: 500 }
    );
  }
}
