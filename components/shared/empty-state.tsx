import { FolderOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-venture/10">
        <FolderOpen className="h-8 w-8 text-venture" />
      </div>
      <h3 className="text-lg font-semibold">No projects yet</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Create your first venture validation project to get AI-powered insights
        powered by VentureIQ™.
      </p>
      <Button variant="venture" className="mt-6" asChild>
        <Link href="/projects/new">Create Your First Project</Link>
      </Button>
    </div>
  );
}
