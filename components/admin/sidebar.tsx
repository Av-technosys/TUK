"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Box,
  List,
  FileText,
  User,
  MessageSquare,
  Settings,
  Code,
  Feather,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
  { label: "Products", href: "/admin/Product", icon: Box },
  { label: "Categories", href: "/admin/category", icon: List },
  { label: "Distributors", href: "/admin/distributors", icon: User },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  // normalize path (remove trailing slash)
  const currentPath = pathname.replace(/\/$/, "");

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="w-64 h-screen   bg-white border-r p-6 font-poppins">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500">Manage your account details</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-4 overflow-y-auto h-[78vh]">
        {navItems.map(({ label, href, icon: Icon }) => {
          let active = false;
          if (href === "/admin") {
            active = currentPath === "/admin";
          } else {
            active = currentPath === href || currentPath.startsWith(`${href}/`);
          }

          return (
            <Link key={href} href={href} onClick={handleLinkClick}>
              <SidebarItem
                icon={<Icon size={24} className="text-orange-400" />}
                label={label}
                active={active}
              />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
      ${
        active
          ? "bg-[#FFF9EE] text-gray-800 font-semibold border-l-4 border-[#D4A056]"
          : "hover:bg-gray-50 text-gray-500"
      }`}
    >
      <span className={active ? "opacity-100" : "opacity-70"}>{icon}</span>
      <span className="text-base">{label}</span>
    </div>
  );
}
