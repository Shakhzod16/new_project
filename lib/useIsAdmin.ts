"use client";

import { useEffect, useState } from "react";

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const read = () => {
      setIsAdmin(
        typeof window !== "undefined" &&
          window.localStorage.getItem("isAdmin") === "true",
      );
    };

    read();
    setHydrated(true);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "isAdmin" || e.key === null) read();
    };

    const handleAdminChange = () => read();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("admin-auth-changed", handleAdminChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("admin-auth-changed", handleAdminChange);
    };
  }, []);

  return { isAdmin, hydrated };
}

export function setAdminLoggedIn(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) {
    window.localStorage.setItem("isAdmin", "true");
  } else {
    window.localStorage.removeItem("isAdmin");
  }
  window.dispatchEvent(new Event("admin-auth-changed"));
}
