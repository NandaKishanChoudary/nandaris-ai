# Nandaris AI

**Powered by VentureIQ™**

An AI-powered venture validation platform that helps aspiring entrepreneurs evaluate startup ideas and generate actionable business insights.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- **Authentication** — Sign up, sign in, sign out with Supabase Auth
- **Project Dashboard** — Create, view, and delete venture projects
- **VentureIQ Scoring** — 6-dimension scoring (0–100) with radar charts
- **Idea Analysis** — Problem statement, audience, value prop, opportunity
- **Competitor Analysis** — Direct/indirect competitors, strengths, weaknesses
- **Branding Generator** — Names, taglines, colors, logo prompts
- **Startup Roadmap** — MVP, 30-day, 90-day plans, launch recommendations
- **PDF Export** — Download professional validation reports
- **Dark Mode** — Modern SaaS UI with shadcn/ui

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Next.js API Routes |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth (SSR) |
| Charts | Recharts |
| PDF | @react-pdf/renderer |
| Deploy | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account

### 1. Clone & Install

```bash
cd nandaris-ai
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
3. Enable **Email** auth under Authentication → Providers
4. Copy your project URL and anon key from Settings → API

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
AI_PROVIDER=mock
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/                  # Next.js App Router pages & API routes
components/           # React components (ui, auth, dashboard, analysis)
lib/                  # Utilities, Supabase clients, constants
services/             # Business logic (projects, VentureIQ, PDF)
types/                # TypeScript type definitions
hooks/                # Custom React hooks
supabase/migrations/  # Database schema SQL
```

## Database Schema

| Table | Description |
|-------|-------------|
| `users` | User profiles (synced from auth.users) |
| `projects` | Startup venture projects |
| `venture_scores` | VentureIQ dimension scores |
| `analyses` | Idea analysis content |
| `competitors` | Competitor intelligence (JSONB) |
| `branding` | Brand kit suggestions |
| `roadmaps` | MVP and launch plans |

All tables have Row Level Security (RLS) enabled.

## AI Engine

The app ships with a **mock VentureIQ engine** that generates deterministic, realistic analysis based on your input. To swap in a real LLM later:

1. Set `AI_PROVIDER=openai` in `.env.local`
2. Add your `OPENAI_API_KEY`
3. Extend `services/ventureiq.service.ts` with your provider

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables from `.env.local.example`
4. Deploy

## License

MIT
