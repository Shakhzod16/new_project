import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import type { Job } from "@/app/types";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";

interface Props {
  searchParams: Promise<{ search?: string; type?: string }>;
}

const JobsPage = async ({ searchParams }: Props) => {
  const supabase = await createClient();
  const params = await searchParams;

  let query = supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (params.search) {
    const term = params.search.trim();
    query = query.or(`title.ilike.%${term}%,company.ilike.%${term}%`);
  }

  if (params.type) {
    query = query.eq("type", params.type);
  }

  const { data: jobs } = await query;

  const list = (jobs ?? []) as Job[];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-8 py-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">All Jobs</h1>

        <div className="mb-8 flex flex-wrap gap-3">
          {["Full-time", "Part-time", "Remote", "Freelance"].map((type) => (
            <Link
              key={type}
              href={`/jobs?type=${encodeURIComponent(type)}`}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:border-blue-900 hover:bg-blue-900 hover:text-white"
            >
              {type}
            </Link>
          ))}
        </div>

        {!list.length ? (
          <p className="py-20 text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
