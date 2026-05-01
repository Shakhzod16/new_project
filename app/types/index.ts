export type Job = {
  id: string;
  created_at: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  type: string;
  description: string;
  requirements: string | null;
  is_active: boolean;
};

export type Application = {
  id: string;
  created_at: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  resume_url: string | null;
  cover_letter: string | null;
  status: string;
  job: {
    title: string;
    company: string;
  } | null;
};
