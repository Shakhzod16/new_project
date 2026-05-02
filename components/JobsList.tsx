import type { Job } from "@/app/types";
import JobCard from "@/components/JobCard";

interface Props {
  jobs: Job[];
}

function JobsList({ jobs }: Props) {
  return (
    <section className="container mx-auto px-8 py-16">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">Latest Jobs</h2>
      {!jobs?.length ? (
        <p className="py-20 text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}

export default JobsList;
