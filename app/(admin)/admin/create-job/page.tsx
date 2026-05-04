"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { addJob, JOB_TYPES } from "@/app/jobs/sample-data";

const CATEGORIES = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
];

type FormState = {
  title: string;
  company: string;
  location: string;
  salary: string;
  category: string;
  type: string;
  description: string;
  requirements: string;
};

const initialForm: FormState = {
  title: "",
  company: "",
  location: "",
  salary: "",
  category: "Technology",
  type: "Full-time",
  description: "",
  requirements: "",
};

export default function CreateJobPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setError("");
  };

  const handleSubmit = () => {
    if (!form.title || !form.company || !form.location || !form.description) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const reqArray = form.requirements
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    try {
      addJob({
        title: form.title,
        company: form.company,
        location: form.location,
        salary: form.salary || "",
        category: form.category,
        type: form.type,
        description: form.description,
        requirements: reqArray,
      });
      router.push("/admin/jobs");
    } catch (err) {
      console.error("Failed to create job", err);
      setError("Failed to create job. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="ml-60 flex-1 p-10">
        <button
          type="button"
          onClick={() => router.push("/admin/jobs")}
          className="mb-6 flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          ← Back to Jobs
        </button>

        <h1 className="mb-1 text-3xl font-extrabold text-gray-900">
          Create New Job
        </h1>
        <p className="mb-8 text-sm text-gray-400">
          Fill in the form below to create a new job posting
        </p>

        <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">Add New Job</h2>

          {error ? (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Senior Frontend Engineer"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Company *
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g., TechCorp"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Salary (Optional)
              </label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g., $100,000 - $150,000"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Job description and responsibilities..."
              className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Requirements (comma-separated)
            </label>
            <input
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder="e.g., React, TypeScript, 5+ years experience, Node.js"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#1e3a6e" }}
            >
              {loading ? "Adding..." : "Add Job"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
