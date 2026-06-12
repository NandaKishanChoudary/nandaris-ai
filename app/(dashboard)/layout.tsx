import { getUser } from "@/lib/supabase/server";
import { Header } from "@/components/layout/header";
import { Sidebar, MobileNav } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header email={user?.email} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
