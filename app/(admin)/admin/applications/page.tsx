"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  type ApplicationStatus,
  type LocalApplication,
  deleteApplication,
  getApplications,
  updateApplicationStatus,
} from "@/lib/applications-storage";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "pending", label: "Kutilmoqda" },
  { value: "reviewed", label: "Ko'rildi" },
  { value: "accepted", label: "Qabul qilindi" },
  { value: "rejected", label: "Rad etildi" },
];

const STATUS_STYLES: Record<
  ApplicationStatus,
  { background: string; color: string }
> = {
  pending: { background: "#fef3c7", color: "#92400e" },
  reviewed: { background: "#dbeafe", color: "#1e40af" },
  accepted: { background: "#d1fae5", color: "#065f46" },
  rejected: { background: "#fee2e2", color: "#991b1b" },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<LocalApplication[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setApplications(getApplications());
    setHydrated(true);
  }, []);

  const handleStatusChange = (id: number, status: ApplicationStatus) => {
    setApplications(updateApplicationStatus(id, status));
  };

  const handleDelete = (id: number) => {
    const confirmed = confirm("Bu arizani o'chirishni xohlaysizmi?");
    if (!confirmed) return;
    setApplications(deleteApplication(id));
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

        {!hydrated ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-gray-400">
            Loading...
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
            <p className="text-gray-400">Hozircha ariza yo&apos;q.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Ariza beruvchi
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Lavozim
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Kompaniya
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Sana
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right font-bold text-gray-900">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {app.applicantName}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {app.applicantEmail}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{app.jobTitle}</td>
                    <td className="px-6 py-4 text-gray-600">{app.company}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(app.appliedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            e.target.value as ApplicationStatus,
                          )
                        }
                        style={STATUS_STYLES[app.status]}
                        className="cursor-pointer rounded-full border-none px-3 py-1 text-xs font-semibold outline-none"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(app.id)}
                        className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                      >
                        O&apos;chirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
