"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function VerifyOTPClient() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("OTP verified successfully 🎉");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[350px] space-y-4">
        <h1 className="text-xl font-bold">Verify OTP</h1>

        <input
          placeholder="Enter OTP"
          className="w-full border p-2"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify} disabled={loading} className="w-full bg-black text-white p-2">
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
