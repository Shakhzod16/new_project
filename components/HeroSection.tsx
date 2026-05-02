"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const q = search.trim();
    if (q) {
      router.push(`/jobs?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <section className="bg-gray-50 py-32 text-center">
      <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-500">
        Career Opportunities
      </p>

      <h1 className="mb-6 text-6xl font-extrabold text-gray-900">
        Find Your Perfect <span className="text-blue-900">Career</span>
      </h1>

      <p className="mx-auto mb-10 max-w-xl text-lg text-gray-500">
        Discover career opportunities from top companies. Search, filter, and
        apply to roles that match your skills and aspirations.
      </p>

      <div className="mx-auto mb-10 flex max-w-2xl items-center justify-center gap-3 px-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by job title, company, or keyword..."
          className="h-12 flex-1"
        />
        <Button
          onClick={handleSearch}
          className="h-12 bg-blue-900 px-8 text-white hover:bg-blue-800"
        >
          Search
        </Button>
      </div>

      <div className="mb-16 flex items-center justify-center gap-4">
        <Link href="/jobs">
          <Button className="h-12 bg-blue-900 px-8 text-white hover:bg-blue-800">
            Browse All Jobs
          </Button>
        </Link>
        <Link href="/admin">
          <Button variant="outline" className="h-12 px-8">
            Post a Job
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-16">
        <div>
          <p className="text-3xl font-bold text-blue-900">500+</p>
          <p className="mt-1 text-sm text-gray-500">Active Jobs</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-900">200+</p>
          <p className="mt-1 text-sm text-gray-500">Companies</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-900">50K+</p>
          <p className="mt-1 text-sm text-gray-500">Placements</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
