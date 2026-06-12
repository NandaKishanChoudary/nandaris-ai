import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectList } from "@/components/dashboard/project-list";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Projects</h1>
          <p className="text-muted-foreground text-sm">
            Manage and analyze your startup ideas
          </p>
        </div>
        <Button variant="venture" asChild>
          <Link href="/projects/new">
            <PlusCircle className="h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
      <ProjectList />
    </div>
  );
}
