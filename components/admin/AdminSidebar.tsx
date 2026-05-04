"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAdmin");
    router.push("/");
  };

  const links = [
    { href: "/admin/jobs", label: "Jobs", icon: "📋" },
    { href: "/admin/create-job", label: "Create Job", icon: "➕" },
    { href: "/admin/applications", label: "Applications", icon: "🔵" },
  ];

  return (
    <aside className="fixed left-0 top-0 flex min-h-screen w-60 flex-col justify-between bg-black">
      <div>
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
            JP
          </div>
          <span className="text-lg font-bold text-white">JobPortal</span>
        </div>

        <div className="px-4">
          <p className="mb-3 px-2 text-xs font-semibold text-gray-500">
            ADMIN MENU
          </p>
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="px-4 pb-6">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl bg-red-600 py-3 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
