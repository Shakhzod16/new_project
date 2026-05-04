"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  jobTitle: string;
  onClose: () => void;
}

export default function ApplyModal({ jobTitle, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      alert("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }
    console.log("Application submitted:", { name, email, jobTitle });
    alert("Ariza muvaffaqiyatli yuborildi!");
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="fixed left-1/2 top-1/2 z-[101] w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-4 flex items-start justify-between">
          <h2
            id="apply-modal-title"
            className="text-2xl font-bold text-gray-900"
          >
            Apply for Position
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Apply to: <strong className="text-gray-900">{jobTitle}</strong>
        </p>

        <div className="mb-4">
          <label
            htmlFor="apply-name"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="apply-name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-900"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="apply-email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="apply-email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-blue-900"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1e3a6e" }}
        >
          Submit Application
        </button>
      </div>
    </>
  );
}
