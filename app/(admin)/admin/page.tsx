"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_EMAIL = "admin@jobportal.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/jobs");
    } else {
      setError("Email yoki parol noto'g'ri");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded bg-blue-900 font-bold text-white">
            JP
          </div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Sign in to manage job postings</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jobportal.com"
              type="email"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              className="mt-1"
            />
          </div>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <Button onClick={handleLogin} className="w-full bg-blue-900 hover:bg-blue-800">
            Sign In
          </Button>
        </div>

        <div className="mt-4 rounded bg-gray-100 p-3 text-sm text-gray-600">
          <p className="font-semibold">Demo Credentials:</p>
          <p>Email: admin@jobportal.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
