import type { Application } from "@/app/types";

interface ApplicationCardProps {
  application: Application;
}

function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{application.full_name}</h3>
          <p className="text-sm text-gray-600">{application.email}</p>
          {application.job ? (
            <p className="text-xs text-gray-500">
              {application.job.title} • {application.job.company}
            </p>
          ) : null}
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium uppercase text-blue-700">
          {application.status}
        </span>
      </div>
      {application.cover_letter ? (
        <p className="mt-3 line-clamp-3 text-sm text-gray-700">
          {application.cover_letter}
        </p>
      ) : (
        <p className="mt-3 text-sm text-gray-500">No cover letter provided.</p>
      )}
      <p className="mt-4 text-xs text-gray-500">
        Submitted: {new Date(application.created_at).toLocaleDateString()}
      </p>
    </article>
  );
}

export default ApplicationCard;
