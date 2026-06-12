import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Brain,
  FileText,
  Palette,
  Rocket,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { APP_NAME, APP_TAGLINE, VENTURE_IQ } from "@/lib/constants";

const features = [
  {
    icon: Brain,
    title: "VentureIQ Scoring",
    description:
      "Get a comprehensive 0-100 score across market demand, competition, revenue potential, scalability, and feasibility.",
  },
  {
    icon: Target,
    title: "Idea Analysis",
    description:
      "AI-generated problem statements, target audience profiles, value propositions, and opportunity summaries.",
  },
  {
    icon: Shield,
    title: "Competitor Intelligence",
    description:
      "Identify direct and indirect competitors with strengths, weaknesses, and differentiation opportunities.",
  },
  {
    icon: Palette,
    title: "Branding Generator",
    description:
      "Name suggestions, taglines, brand personality, color palettes, and logo prompts tailored to your venture.",
  },
  {
    icon: Rocket,
    title: "Startup Roadmap",
    description:
      "MVP features, 30-day and 90-day plans, and actionable launch recommendations.",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    description:
      "Export professional venture validation reports to share with co-founders, mentors, or investors.",
  },
];

const stats = [
  { label: "Score Dimensions", value: "6" },
  { label: "Analysis Modules", value: "5" },
  { label: "Report Sections", value: "10+" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-venture text-venture-foreground text-sm font-bold">
              N
            </div>
            <span className="font-semibold">{APP_NAME}</span>
            <Badge variant="venture" className="hidden sm:inline-flex">
              {VENTURE_IQ}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="venture" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-venture/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="venture" className="mb-6">
            <Sparkles className="mr-1 h-3 w-3" />
            Powered by {VENTURE_IQ}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Validate Your Startup Idea{" "}
            <span className="text-venture">Before You Build</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {APP_TAGLINE}. Get AI-powered scores, competitor analysis, branding
            suggestions, and actionable roadmaps — all in one platform.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="venture" asChild>
              <Link href="/signup">
                Start Validating Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t pt-8">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-venture">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything You Need to Validate</h2>
            <p className="mt-3 text-muted-foreground">
              From idea to actionable insights in minutes, not months.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-border/50">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-venture/10">
                    <Icon className="h-5 w-5 text-venture" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Zap,
                title: "Submit Your Idea",
                desc: "Describe your startup concept, industry, and target market.",
              },
              {
                step: "02",
                icon: BarChart3,
                title: "Get VentureIQ Analysis",
                desc: "Our AI engine scores and analyzes every dimension of your venture.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Act on Insights",
                desc: "Use your report, roadmap, and branding kit to launch with confidence.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-venture text-venture-foreground font-bold">
                  {step}
                </div>
                <Icon className="mx-auto mb-3 h-6 w-6 text-venture" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-6 py-24">
        <Card className="mx-auto max-w-3xl border-venture/20 bg-venture/5">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to validate your next big idea?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Join aspiring entrepreneurs using {APP_NAME} to make smarter
              startup decisions.
            </p>
            <Button size="lg" variant="venture" className="mt-8" asChild>
              <Link href="/signup">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. Powered by {VENTURE_IQ}.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground">
              Sign In
            </Link>
            <Link href="/signup" className="hover:text-foreground">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
