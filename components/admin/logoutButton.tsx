"use client";

import { Button } from "@base-ui/react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
   <Button onClick={handleLogout} className="border border-black px-6 py-1 rounded-full bg-orange-500 text-white">
    logout
   </Button>
  );
}

//  