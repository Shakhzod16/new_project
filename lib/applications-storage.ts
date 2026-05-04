export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected";

export type LocalApplication = {
  id: number;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  applicantEmail: string;
  status: ApplicationStatus;
  appliedAt: string;
};

const STORAGE_KEY = "applications";

export function getApplications(): LocalApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as LocalApplication[]) : [];
  } catch {
    return [];
  }
}

export function saveApplications(apps: LocalApplication[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function addApplication(
  data: Omit<LocalApplication, "id" | "status" | "appliedAt">,
): LocalApplication {
  const next: LocalApplication = {
    id: Date.now(),
    status: "pending",
    appliedAt: new Date().toISOString(),
    ...data,
  };
  const list = getApplications();
  list.push(next);
  saveApplications(list);
  return next;
}

export function updateApplicationStatus(
  id: number,
  status: ApplicationStatus,
): LocalApplication[] {
  const list = getApplications().map((app) =>
    app.id === id ? { ...app, status } : app,
  );
  saveApplications(list);
  return list;
}

export function deleteApplication(id: number): LocalApplication[] {
  const list = getApplications().filter((app) => app.id !== id);
  saveApplications(list);
  return list;
}
