import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-4 pb-6 pt-12 text-gray-400">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h4 className="mb-3 font-semibold text-white">About JobPortal</h4>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted platform for connecting with career opportunities.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="transition-colors hover:text-white"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/post-job"
                  className="transition-colors hover:text-white"
                >
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Contact</h4>
            <p className="text-sm">
              <a
                href="mailto:support@jobsportal.com"
                className="transition-colors hover:text-white"
              >
                support@jobsportal.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © 2024 JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
