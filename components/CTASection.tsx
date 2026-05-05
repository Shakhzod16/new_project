"use client";

import { useRouter } from "next/navigation";
import { useIsAdmin } from "@/lib/useIsAdmin";

export default function CTASection() {
  const router = useRouter();
  const { isAdmin, hydrated } = useIsAdmin();

  return (
    <section
      style={{ backgroundColor: "#2d4a8a" }}
      className="px-4 py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
          Ready to Advance <br /> Your Career?
        </h2>

        <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-blue-200">
          Discover hundreds of job opportunities from leading companies. Start
          your journey to your next role today.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/jobs")}
            className="rounded border border-white px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-blue-900"
          >
            Explore Jobs
          </button>
          {hydrated && isAdmin ? (
            <button
              type="button"
              onClick={() => router.push("/admin/create-job")}
              className="rounded border border-white px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-blue-900"
            >
              Post a Job
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
