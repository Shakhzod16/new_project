import { createClient } from "@/utils/supabase/server";
import type { Job } from "@/app/types";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JobsList from "@/components/JobsList";

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Home = async ({ searchParams }: Props) => {
  const supabase = await createClient();
  const params = await searchParams;

  let query = supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (params.search) {
    const term = params.search.trim();
    query = query.or(`title.ilike.%${term}%,company.ilike.%${term}%`);
  }

  const { data: jobs } = await query;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <JobsList jobs={(jobs ?? []) as Job[]} />
    </div>
  );
};

export default Home;
