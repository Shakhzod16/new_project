"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  jobId: string;
}

function ApplyForm({ jobId }: Props) {
  const supabase = createClient();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = async () => {
    if (!form.full_name || !form.email || !form.phone) {
      alert("Iltimos barcha majburiy maydonlarni to'ldiring!");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("applications").insert([
      { ...form, job_id: jobId },
    ]);
    setLoading(false);
    if (error) {
      console.error(error);
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="mb-2 text-xl font-bold text-green-700">
          Application Submitted!
        </p>
        <p className="text-green-600">We will contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Apply for this Job</h2>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Full Name *"
          value={form.full_name}
          onChange={(e) => handleChange("full_name", e.target.value)}
        />
        <Input
          placeholder="Email *"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          placeholder="Phone *"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <Textarea
          placeholder="Cover Letter (optional)"
          value={form.cover_letter}
          onChange={(e) => handleChange("cover_letter", e.target.value)}
          rows={5}
        />
        <Button
          onClick={handleApply}
          disabled={loading}
          className="h-12 bg-blue-900 text-white hover:bg-blue-800"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}

export default ApplyForm;
