"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateJobPage() {
  const router = useRouter();
  const supabase = createClient();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    requirements: "",
  });

  const handleChange = (field: string, value: string | null) => {
    setForm((prev) => ({ ...prev, [field]: value ?? "" }));
  };

  const handleSave = async () => {
    if (!form.title || !form.company || !form.description || !form.type) {
      alert("Majburiy maydonlarni to'ldiring!");
      return;
    }
    const { error } = await supabase.from("jobs").insert([form]);
    if (error) {
      console.error("message:", error.message);
      console.error("details:", error.details);
      console.error("code:", error.code);
      return;
    }
    router.push("/admin/jobs");
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-8">
        <h1 className="mb-6 text-2xl font-bold">Create Job</h1>
        <div className="flex max-w-2xl flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
          <Input
            placeholder="Job Title *"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Company *"
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
          <Input
            placeholder="Location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <Input
            placeholder="Salary (e.g. $1000-2000)"
            value={form.salary}
            onChange={(e) => handleChange("salary", e.target.value)}
          />
          <Select
            value={form.type ?? ""}
            onValueChange={(val) => handleChange("type", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Job Type *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Description *"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <Textarea
            placeholder="Requirements"
            value={form.requirements}
            onChange={(e) => handleChange("requirements", e.target.value)}
          />
          <Button onClick={handleSave} className="bg-blue-900 hover:bg-blue-800">
            Create Job
          </Button>
        </div>
      </main>
    </div>
  );
}
