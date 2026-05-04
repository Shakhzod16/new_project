"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  deleteJob,
  getJobs,
  type SampleJob,
} from "@/app/jobs/sample-data";

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<SampleJob[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setJobs(getJobs());
    setHydrated(true);
  }, []);

  const handleDelete = (id: string) => {
    const confirmed = confirm("Bu ishni o'chirmoqchimisiz?");
    if (!confirmed) return;
    setJobs(deleteJob(id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="ml-60 flex-1 p-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="mb-1 text-3xl font-extrabold text-gray-900">
              Jobs Management
            </h1>
            <p className="text-sm text-gray-400">Manage all your job postings</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/admin/create-job")}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1e3a6e" }}
          >
            + Create New Job
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">
              All Jobs ({jobs.length})
            </h2>
          </div>

          {!hydrated ? (
            <div className="py-16 text-center text-gray-400">Loading...</div>
          ) : jobs.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-400">
                No jobs yet. Click &quot;Create New Job&quot; to add one.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Type
                  </th>
                  <th className="px-6 py-4 text-right font-bold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {job.title}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{job.company}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {job.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => router.push(`/jobs/${job.id}`)}
                        className="mr-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(job.id)}
                        className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
