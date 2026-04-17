"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <tr ref={setNodeRef} style={style} className="border-b text-center">
      {/* Drag Handle */}
      <td {...listeners} className="cursor-grab">
        ☰
      </td>

      <td>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="h-16 w-16 object-contain"
          />
        )}
      </td>

      <td>{item.name}</td>
      <td>{item.slug}</td>

      <td className="space-x-2">
        <Link href={`/admin/distributors/edit/${item.id}`}>
          <Button>Edit</Button>
        </Link>

        <Button variant="destructive" onClick={() => handleDelete(item.id)}>
          Delete
        </Button>
      </td>
    </tr>
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

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th></th> {/* drag column */}
            <th>Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <tbody>
              {data.map((item) => (
                <SortableRow
                  key={item.id}
                  item={item}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </SortableContext>
        </DndContext>
      </table>
    </div>
  );
}
