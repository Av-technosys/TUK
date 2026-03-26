"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

const handleLogin = async () => {
  if (!form.email || !form.password) {
    toast.error("Please enter email & password ❌");
    return;
  }

  const toastId = toast.loading("Logging in...");

  try {
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error || "Invalid credentials ❌", {
        id: toastId,
      });
    } else {
      toast.success("Login successful 🎉", {
        id: toastId,
      });

      setTimeout(() => {
        router.push("/admin");
      }, 800);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong ❌", {
      id: toastId,
    });
  }
};

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[350px] space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

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

        <button onClick={handleLogin} className="w-full bg-black text-white p-2">
          Login
        </button>

        <p
          className="text-sm text-blue-500 cursor-pointer"
          onClick={() => router.push("/forgot-password")}
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
}