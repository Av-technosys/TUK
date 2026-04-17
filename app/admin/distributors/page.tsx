"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function SortableRow({ item, handleDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      {/* Drag Handle */}
      <TableCell {...listeners} className="cursor-grab text-center">
        ☰
      </TableCell>

      <TableCell className="text-center">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="h-16 w-16 object-contain mx-auto"
          />
        )}
      </TableCell>

      <TableCell className="text-center">{item.name}</TableCell>
      <TableCell className="text-center">{item.slug}</TableCell>

      <TableCell className="text-center">
        <div className="flex justify-center gap-2">
          <Link href={`/admin/distributors/edit/${item.id}`}>
            <Button size="sm">Edit</Button>
          </Link>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function DistributorList() {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/distributors");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/distributors/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((i) => i.id === active.id);
    const newIndex = data.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(data, oldIndex, newIndex);

    setData(newItems);

    // 🔥 Save order in DB
    await fetch("/api/distributors/reorder", {
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
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Distributors</h2>

        <Link href="/admin/distributors/add">
          <Button>Add Distributor</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Slug</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <TableBody>
              {data.map((item) => (
                <SortableRow
                  key={item.id}
                  item={item}
                  handleDelete={handleDelete}
                />
              ))}
            </TableBody>
          </SortableContext>
        </DndContext>
      </Table>
    </div>
  );
}
