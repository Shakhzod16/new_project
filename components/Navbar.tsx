import Link from "next/link";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900 text-sm font-bold text-white">
          JP
        </div>
        <span className="text-lg font-bold text-gray-900">JobPortal</span>
      </div>

      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="font-medium text-gray-600 hover:text-gray-900"
        >
          Home
        </Link>
        <Link
          href="/jobs"
          className="font-medium text-gray-600 hover:text-gray-900"
        >
          Jobs
        </Link>
        <Link href="/admin">
          <Button className="bg-blue-900 px-5 text-white hover:bg-blue-800">
            Post a Job
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
