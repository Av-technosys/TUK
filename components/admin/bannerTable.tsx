"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: boolean;
};

type RowProps = {
  banner: Banner;
  onEdit: (data: Banner) => void;
  refresh: () => void;
};

function Row({ banner, onEdit, refresh }: RowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: banner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggle = async () => {
    await fetch(`/api/banner/${banner.id}`, {
      method: "PUT",
      body: JSON.stringify({ isActive: !banner.isActive }),
    });
    toast.success("Status updated");
    refresh();
  };

  const deleteBanner = async () => {
    await fetch(`/api/banner/${banner.id}`, { method: "DELETE" });
    toast.success("Deleted");
    refresh();
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td className="p-3">
        <img src={banner.imageUrl} className="w-20 h-12 rounded" />
      </td>
      <td>{banner.title}</td>
      <td>
        <Switch checked={banner.isActive} onCheckedChange={toggle} />
      </td>
      <td className="space-x-2">
        <Button size="sm" onClick={() => onEdit(banner)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={deleteBanner}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default function BannerTable({
  banners = [],
  refresh,
  onEdit,
}: {
  banners?: Banner[];
  refresh: () => void;
  onEdit: (data: Banner) => void;
}) {
  const bannersList = Array.isArray(banners) ? banners : [];

  return (
    <DndContext collisionDetection={closestCenter}>
      <SortableContext
        items={bannersList}
        strategy={verticalListSortingStrategy}
      >
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-muted text-left text-sm font-semibold">
            <tr>
              <th className="p-3">Image</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bannersList.map((banner) => (
              <Row
                key={banner.id}
                banner={banner}
                onEdit={onEdit}
                refresh={refresh}
              />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
}
