"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { supabase } from "@/lib/supabase";

type ApplicationRow = {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  job: { title: string; company: string } | null;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        full_name,
        email,
        created_at,
        job:jobs (
          title,
          company
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data as ApplicationRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchApplications();
  }, [fetchApplications]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Delete this application?");
    if (!confirmed) return;
    await supabase.from("applications").delete().eq("id", id);
    void fetchApplications();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="ml-60 flex-1 p-10">
        <h1 className="mb-1 text-3xl font-extrabold text-gray-900">
          Job Applications
        </h1>
        <p className="mb-8 text-sm text-gray-400">
          Review and manage all job applications ({applications.length} total)
        </p>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left font-bold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-4 text-left font-bold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-4 text-left font-bold text-gray-900">
                  Job
                </th>
                <th className="px-6 py-4 text-left font-bold text-gray-900">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-right font-bold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    No applications yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {app.full_name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{app.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {app.job?.title} - {app.job?.company}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(app.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Viewing: ${app.full_name}`)}
                        className="mr-4 font-medium text-gray-700 transition-colors hover:text-black"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(app.id)}
                        className="font-medium text-red-500 transition-colors hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
