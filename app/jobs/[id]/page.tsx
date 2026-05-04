"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ApplyModal from "@/components/ApplyModal";
import { getJobById } from "../sample-data";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const job = getJobById(params.id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="mb-3 text-2xl font-bold text-gray-900">
            Job not found
          </h1>
          <p className="mb-6 text-gray-500">
            The job you are looking for does not exist or has been removed.
          </p>
          <button
            type="button"
            onClick={() => router.push("/jobs")}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: "#1e3a6e" }}
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <button
          type="button"
          onClick={() => router.push("/jobs")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </button>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="mb-2 text-3xl font-extrabold text-gray-900">
                {job.title}
              </h1>
              <p className="mb-4 text-lg text-gray-600">{job.company}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {job.category}
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {job.type}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  📍 {job.location}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:w-auto"
                style={{ backgroundColor: "#1e3a6e" }}
              >
                Apply Now
              </button>
            </div>

            <div className="shrink-0 rounded-xl bg-orange-50 px-5 py-4 text-center md:text-right">
              <p className="text-xs uppercase tracking-wide text-orange-600">
                Salary
              </p>
              <p className="text-xl font-bold text-orange-700">{job.salary}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Job Description
              </h2>
              <p className="leading-relaxed text-gray-600">{job.description}</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((req) => (
                  <li
                    key={req}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "#1e3a6e" }}
                    />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="mb-5 text-lg font-bold text-gray-900">Job Details</h3>

            <DetailRow
              icon={<MapPin size={16} />}
              label="Location"
              value={job.location}
            />
            <DetailRow
              icon={<Briefcase size={16} />}
              label="Job Type"
              value={job.type}
            />
            <DetailRow
              icon={<Briefcase size={16} />}
              label="Category"
              value={job.category}
            />
            <DetailRow
              icon={<DollarSign size={16} />}
              label="Salary"
              value={job.salary}
              valueClassName="text-orange-600 font-bold"
            />
            <DetailRow
              icon={<Building2 size={16} />}
              label="Company"
              value={job.company}
              isLast
            />
          </aside>
        </div>
      </div>

      {isModalOpen ? (
        <ApplyModal
          jobId={job.id}
          jobTitle={job.title}
          company={job.company}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  valueClassName,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={
        "flex items-start justify-between gap-4 py-3" +
        (isLast ? "" : " border-b border-gray-100")
      }
    >
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {icon}
        <span>{label}</span>
      </div>
      <strong
        className={
          "text-right text-sm text-gray-900" +
          (valueClassName ? ` ${valueClassName}` : "")
        }
      >
        {value}
      </strong>
    </div>
  );
}
