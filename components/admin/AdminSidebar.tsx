"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, Plus, Users, LogOut } from "lucide-react";

function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen w-64 flex-col bg-black p-4 text-white">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-900 text-xs font-bold">
          JP
        </div>
        <span className="text-lg font-bold">JobPortal</span>
      </div>

      <p className="mb-4 text-xs text-gray-400">ADMIN MENU</p>

      <nav className="flex flex-1 flex-col gap-2">
        <Link
          href="/admin/jobs"
          className="flex items-center gap-3 rounded px-3 py-2 hover:bg-gray-800"
        >
          <Briefcase size={16} /> Jobs
        </Link>
        <Link
          href="/admin/jobs/create"
          className="flex items-center gap-3 rounded px-3 py-2 hover:bg-gray-800"
        >
          <Plus size={16} /> Create Job
        </Link>
        <Link
          href="/admin/applications"
          className="flex items-center gap-3 rounded px-3 py-2 hover:bg-gray-800"
        >
          <Users size={16} /> Applications
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 rounded bg-red-500 px-4 py-2 hover:bg-red-600"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
