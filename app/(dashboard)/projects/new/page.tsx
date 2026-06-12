import { IdeaForm } from "@/components/analysis/idea-form";

export const metadata = {
  title: "New Project",
};

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Venture Project</h1>
        <p className="text-muted-foreground text-sm">
          Submit your startup idea for VentureIQ™ analysis
        </p>
      </div>
      <IdeaForm />
    </div>
  );
}
