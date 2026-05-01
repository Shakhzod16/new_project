import type { Job } from "@/app/types";

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">
            {job.company} • {job.location}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${
            job.is_active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {job.is_active ? "active" : "inactive"}
        </span>
      </div>
      <p className="mt-3 text-sm text-gray-700">{job.description}</p>
      <div className="mt-4 text-xs text-gray-500">
        Type: {job.type} | Salary: {job.salary ?? "N/A"} | Created:{" "}
        {new Date(job.created_at).toLocaleDateString()}
      </div>
    </article>
  );
}

export default JobCard;
