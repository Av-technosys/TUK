"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ResetPasswordClient() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!otp || !password) {
      toast.error("OTP & Password are required ❌");
      return;
    }

    const toastId = toast.loading("Resetting password...");

    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          email,
          otp,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password reset successful 🎉", {
          id: toastId,
        });

        setTimeout(() => {
          router.push("/login");
        }, 800);
      } else {
        toast.error(data.error || "Reset failed ❌", {
          id: toastId,
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong ❌", {
        id: toastId,
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[350px] space-y-4">
        <h1 className="text-xl font-bold">Reset Password</h1>

        <input
          placeholder="OTP"
          className="w-full border p-2"
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-black cursor-pointer text-white p-2"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </div>
  );
}
