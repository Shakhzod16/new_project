import { createClient } from "@/utils/supabase/server";
import type { Job } from "@/app/types";
import Navbar from "@/components/Navbar";
import ApplyForm from "@/components/ApplyForm";
import { MapPin, Briefcase, DollarSign } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const JobDetailPage = async ({ params }: Props) => {
  const supabase = await createClient();
  const { id } = await params;

  const { data: jobRow } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  const job = jobRow as Job | null;

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="py-20 text-center text-gray-500">Job not found.</p>
      </div>
    );
  }

  const initials =
    job.company.length >= 2
      ? job.company.slice(0, 2).toUpperCase()
      : job.company.toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-8 py-12">
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-8">
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-900 text-lg font-bold text-white">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                <p className="text-gray-500">{job.company}</p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900">
              {job.type}
            </span>
          </div>

          <div className="mb-8 flex gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            {job.salary ? (
              <div className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>{job.salary}</span>
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>{job.type}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900">Description</h2>
            <p className="leading-relaxed text-gray-600">{job.description}</p>
          </div>

          {job.requirements ? (
            <div>
              <h2 className="mb-3 text-lg font-bold text-gray-900">
                Requirements
              </h2>
              <p className="leading-relaxed text-gray-600">{job.requirements}</p>
            </div>
          ) : null}
        </div>

        <ApplyForm jobId={id} />
      </div>
    </div>
  );
};

export default JobDetailPage;
