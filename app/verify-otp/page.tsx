import { Suspense } from "react";
import { VerifyOTPClient } from "./VerifyOTPClient";

export const dynamic = "force-dynamic";

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <VerifyOTPClient />
    </Suspense>
  );
}
