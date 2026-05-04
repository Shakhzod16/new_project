export type SampleJob = {
  id: string;
  title: string;
  company: string;
  description: string;
  category: string;
  type: string;
  location: string;
  salary: string;
  requirements: string[];
  createdAt?: string;
};

const STORAGE_KEY = "jobs";

export const CATEGORIES = [
  "All Categories",
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
];

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

export const INITIAL_JOBS: SampleJob[] = [
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
    createdAt: "2025-01-01T00:00:00.000Z",
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
    createdAt: "2025-01-02T00:00:00.000Z",
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
    createdAt: "2025-01-03T00:00:00.000Z",
  },
];

// Backward-compat alias — some callers may still import SAMPLE_JOBS
export const SAMPLE_JOBS = INITIAL_JOBS;

export function getJobs(): SampleJob[] {
  if (typeof window === "undefined") return INITIAL_JOBS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) return parsed as SampleJob[];
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
    return INITIAL_JOBS;
  } catch {
    return INITIAL_JOBS;
  }
}

export function saveJobs(jobs: SampleJob[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function getJobById(id: string): SampleJob | undefined {
  return getJobs().find((j) => j.id === id);
}

export function addJob(
  data: Omit<SampleJob, "id" | "createdAt">,
): SampleJob {
  const next: SampleJob = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  const list = getJobs();
  list.push(next);
  saveJobs(list);
  return next;
}

export function deleteJob(id: string): SampleJob[] {
  const list = getJobs().filter((j) => j.id !== id);
  saveJobs(list);
  return list;
}
