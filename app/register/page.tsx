"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required ❌");
      return;
    }

    const toastId = toast.loading("Creating account...");

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("OTP sent successfully 📩", {
          id: toastId,
        });

        setTimeout(() => {
          router.push(`/verify-otp?email=${form.email}`);
        }, 800);
      } else {
        toast.error(data.error || "Registration failed ❌", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌", {
        id: toastId,
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-[380px] bg-white shadow-xl rounded-2xl p-8 space-y-5">
        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-500">Register to get started</p>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            placeholder="Enter your name"
            className="w-full mt-1 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none p-2.5 rounded-lg transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            placeholder="Enter your email"
            className="w-full mt-1 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none p-2.5 rounded-lg transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full mt-1 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none p-2.5 rounded-lg transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Register Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black cursor-pointer hover:bg-gray-800 text-white p-2.5 rounded-lg font-medium transition"
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
