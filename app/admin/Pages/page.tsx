"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Plus } from "lucide-react";

interface PageData {
  id: string;
  title: string;
  slug: string;
  description: string;
}

const initialPages: PageData[] = [
  {
    id: "1",
    title: "Homepage",
    slug: "home",
    description: "Main landing page of the website",
  },
  {
    id: "2",
    title: "About Page",
    slug: "about",
    description: "Information about our company and mission",
  },
  {
    id: "3",
    title: "Terms & Conditions",
    slug: "terms-conditions",
    description: "Legal terms and conditions for users",
  },
  {
    id: "4",
    title: "Privacy Policy",
    slug: "privacy-policy",
    description: "Privacy policy and data protection information",
  },
  {
    id: "5",
    title: "Contact Page",
    slug: "contact",
    description: "Get in touch with us - contact form and details",
  },
];

export default function PagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<PageData[]>(initialPages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageData | null>(null);
  const [formData, setFormData] = useState<PageData>({
    id: "",
    title: "",
    slug: "",
    description: "",
  });

  const handleEdit = (page: PageData) => {
    // Route to separate page for privacy policy and about
    if (page.slug === "home") {
      router.push("/admin/Pages/home");
      return;
    }
    if (page.slug === "privacy-policy") {
      router.push("/admin/Pages/privacy-policy");
      return;
    }
    if (page.slug === "about") {
      router.push("/admin/Pages/about");
      return;
    }
    if (page.slug === "terms-conditions") {
      router.push("/admin/Pages/terms-conditions");
      return;
    }
    if (page.slug === "contact") {
      router.push("/admin/Pages/contact");
      return;
    }
    // Use dialog for other pages
    setEditingPage(page);
    setFormData(page);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPage) {
      setPages(pages.map((p) => (p.id === editingPage.id ? formData : p)));
    }
    setIsDialogOpen(false);
    setEditingPage(null);
    setFormData({ id: "", title: "", slug: "", description: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPage(null);
    setFormData({ id: "", title: "", slug: "", description: "" });
  };

  return (
    <div className="w-full p-6 font-poppins">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
          <p className="text-gray-500 mt-2">
            Manage your website pages and their content
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Page
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead className="w-[150px]">Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="text-gray-600">{page.slug}</TableCell>
                <TableCell className="text-gray-600 max-w-md truncate">
                  {page.description}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(page)}
                    className="gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Page: {editingPage?.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter page title"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Enter page slug"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter page description"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
