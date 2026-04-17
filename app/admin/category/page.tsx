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

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

function SortableRow({ cat, handleDelete, router }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: cat.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell {...listeners} className="cursor-grab w-10">
        <GripVertical />
      </TableCell>

      <TableCell>
        <img
          src={cat.image || "/no-image.png"}
          className="w-12 h-12 rounded object-cover"
        />
      </TableCell>

      {/* ✅ Name */}
      <TableCell className="font-medium">{cat.name}</TableCell>

      {/* ✅ Actions (no gap now) */}
      <TableCell className="text-right space-x-2">
        <Button
          className="bg-black text-white px-3 py-1 text-sm rounded"
          onClick={() => router.push(`/admin/category/${cat.id}`)}
        >
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive" className="px-3 py-1 text-sm">
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction onClick={() => handleDelete(cat.id)}>
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}

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

  // 🔥 DRAG LOGIC
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex((c) => c.id === active.id);
    const newIndex = categories.findIndex((c) => c.id === over.id);

    const newItems = arrayMove(categories, oldIndex, newIndex);

    setCategories(newItems);

    await fetch("/api/category/reorder", {
      method: "POST",
      body: JSON.stringify({
        items: newItems.map((item, index) => ({
          id: item.id,
          position: index,
        })),
      }),
    });
  };

  return (
    <div className="p-6 font-barlow">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <Button onClick={() => router.push("/admin/category/add")}>
          + Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-center lg:text-left">Name</TableHead>
            <TableHead className="text-center lg:text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categories.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <TableBody>
              {categories.map((cat) => (
                <SortableRow
                  key={cat.id}
                  cat={cat}
                  handleDelete={handleDelete}
                  router={router}
                />
              ))}
            </TableBody>
          </SortableContext>
        </DndContext>
      </Table>
    </div>
  );
}
