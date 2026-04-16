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
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 font-poppins
    "
    >
      <div className="w-[380px] bg-white shadow-xl rounded-2xl p-8 space-y-5">
        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="text-sm text-gray-500">Login to your account</p>
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
            placeholder="Enter your password"
            className="w-full mt-1 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none p-2.5 rounded-lg transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <p
            className="text-sm text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full cursor-pointer bg-black hover:bg-gray-800 text-white p-2.5 rounded-lg font-medium transition"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-500 cursor-pointer hover:underline font-medium"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
