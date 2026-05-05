"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (pathname === "/admin") {
      setAllowed(true);
      return;
    }

    const isAdmin =
      typeof window !== "undefined" &&
      window.localStorage.getItem("isAdmin") === "true";

    if (!isAdmin) {
      router.replace("/admin");
      return;
    }

    setAllowed(true);
  }, [pathname, router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500">
        Tekshirilmoqda...
      </div>
    );
  }

  return <>{children}</>;
}
