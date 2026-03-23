"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  const fetchCategories = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });

    fetchCategories();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <Button onClick={() => router.push("/admin/category/add")}>
          + Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>
                <img
                  src={cat.image || "/no-image.png"}
                  className="w-12 h-12 rounded object-cover"
                />
              </TableCell>

              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.description}</TableCell>

              <TableCell className="text-right space-x-2">

                {/* EDIT */}
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/admin/category/${cat.id}`)
                  }
                >
                  Edit
                </Button>

                {/* 🔥 DELETE WITH DIALOG */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50">
                      Delete
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={() => handleDelete(cat.id)}
                      >
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}