import { createClient } from "@/utils/supabase/server";
import type { Application } from "@/app/types";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ApplicationCard from "@/components/admin/ApplicationCard";

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const { data: applications } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-8">
        <h1 className="mb-6 text-2xl font-bold">Applications</h1>
        <div className="grid grid-cols-1 gap-4">
          {(applications as Application[])?.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      </main>
    </div>
  );
}
