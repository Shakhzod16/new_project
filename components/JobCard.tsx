import Link from "next/link";
import type { Job } from "@/app/types";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, DollarSign } from "lucide-react";

interface Props {
  job: Job;
}

function JobCard({ job }: Props) {
  const initials =
    job.company.length >= 2
      ? job.company.slice(0, 2).toUpperCase()
      : job.company.toUpperCase() || "?";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900 text-sm font-bold text-white">
          {initials}
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900">
          {job.type}
        </span>
      </div>

      <h3 className="mb-1 line-clamp-1 text-lg font-bold text-gray-900">
        {job.title}
      </h3>
      <p className="mb-4 text-sm text-gray-500">{job.company}</p>

      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        {job.salary ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <DollarSign size={14} />
            <span>{job.salary}</span>
          </div>
        ) : null}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Briefcase size={14} />
          <span>{job.type}</span>
        </div>
      </div>

      <Link href={`/jobs/${job.id}`}>
        <Button className="w-full bg-blue-900 text-white hover:bg-blue-800">
          View Details
        </Button>
      </Link>
    </div>
  );
}

export default JobCard;
