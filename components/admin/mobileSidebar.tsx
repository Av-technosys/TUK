// components/admin/mobile-sidebar.tsx
"use client";

import { Menu } from "lucide-react";
import { Sidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-64">
        <Sidebar onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
