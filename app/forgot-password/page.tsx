"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

const handleSendOTP = async () => {
  if (!email) {
    toast.error("Please enter your email ❌");
    return;
  }

  const toastId = toast.loading("Sending OTP...");

  try {
    setLoading(true);

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("OTP sent to your email 📩", {
        id: toastId,
      });

      setTimeout(() => {
        router.push(`/reset-password?email=${email}`);
      }, 800);
    } else {
      toast.error(data.error || "Failed to send OTP ❌", {
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
        <h1 className="text-xl font-bold">Forgot Password</h1>

        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
  onClick={handleSendOTP}
  disabled={loading}
  className="w-full bg-black text-white p-2"
>
  {loading ? "Sending..." : "Send OTP"}
</Button>
      </div>
    </div>
  );
}