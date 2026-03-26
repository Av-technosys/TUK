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
    <div className="flex h-screen items-center justify-center">
      <div className="w-[350px] space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          placeholder="Name"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

       <Button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full bg-black text-white p-2"
>
  {loading ? "Registering..." : "Register"}
</Button>
      </div>
    </div>
  );
}