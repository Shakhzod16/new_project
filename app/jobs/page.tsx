"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type SampleJob = {
  id: string;
  title: string;
  company: string;
  description: string;
  category: string;
  type: string;
  location: string;
  salary: string;
  requirements: string[];
};

const SAMPLE_JOBS: SampleJob[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    description:
      "We are looking for an experienced Frontend Engineer to join our growing team. You will work on modern web applications using React and TypeScript.",
    category: "Technology",
    type: "Full-time",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    requirements: ["React", "TypeScript", "5+ years experience", "GraphQL"],
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Design Studio",
    description:
      "Looking for a creative UX/UI Designer to craft beautiful and intuitive user interfaces for our clients.",
    category: "Design",
    type: "Full-time",
    location: "New York, NY",
    salary: "$80,000 - $110,000",
    requirements: ["Figma", "Adobe XD", "3+ years experience"],
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "DataSoft",
    description:
      "Join our backend team to build scalable APIs and services using Node.js and PostgreSQL.",
    category: "Technology",
    type: "Remote",
    location: "Remote",
    salary: "$100,000 - $140,000",
    requirements: ["Node.js", "PostgreSQL", "REST API"],
  },
];

const CATEGORIES = [
  "All Categories",
  "Technology",
  "Design",
  "Marketing",
  "Finance",
];

export default function JobsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filtered = SAMPLE_JOBS.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      category === "All Categories" || job.category === category;
    return matchSearch && matchCategory;
  });

  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
          Find Your Next Opportunity
        </h1>
        <p className="mb-8 text-gray-500">
          Explore our curated list of job openings and find the perfect match
          for your career.
        </p>

        <div className="flex items-start gap-6">
          <aside className="sticky top-6 w-72 shrink-0 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Filter Jobs</h2>

            <div className="mb-6">
              <label className="mb-2 block text-sm text-gray-600">
                Search by keyword
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, company, or skills..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm text-gray-600">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Reset Filters
            </button>

            <p className="mt-4 text-xs text-gray-400">Category: {category}</p>
          </aside>

          <main className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Available Jobs</h2>
              <span className="text-sm text-gray-400">
                {filtered.length} positions
              </span>
            </div>

            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-400">
                  No jobs found. Try different filters.
                </div>
              ) : (
                filtered.map((job) => (
                  <JobsListingCard
                    key={job.id}
                    job={job}
                    onView={() => router.push(`/jobs/${job.id}`)}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function JobsListingCard({
  job,
  onView,
}: {
  job: SampleJob;
  onView: () => void;
}) {
  const initial = job.company.charAt(0).toUpperCase();
  const visibleReqs = job.requirements.slice(0, 3);
  const extraCount = job.requirements.length - 3;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: "#1e3a6e" }}
        >
          {initial}
        </div>
      </div>

      <p className="mb-4 mt-3 text-sm leading-relaxed text-gray-600">
        {job.description}
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {job.category}
        </span>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {job.type}
        </span>
      </div>

      <div className="mb-4 flex gap-4 text-sm text-gray-500">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
      </div>

      <div className="mb-5">
        <span className="mb-2 block text-xs text-gray-400">Requirements:</span>
        <div className="flex flex-wrap gap-2">
          {visibleReqs.map((req) => (
            <span
              key={req}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
            >
              {req}
            </span>
          ))}
          {extraCount > 0 ? (
            <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-400">
              +{extraCount} more
            </span>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={onView}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#1e3a6e" }}
      >
        View Details
      </button>
    </div>
  );
}
