import { createClient } from "@/utils/supabase/server";
import type { Job } from "@/app/types";
import AdminSidebar from "@/components/admin/AdminSidebar";
import JobCard from "@/components/admin/JobCard";

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 flex-1 p-10">
        <h1 className="mb-6 text-2xl font-bold">Jobs</h1>
        <div className="grid grid-cols-1 gap-4">
          {(jobs as Job[])?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
}
