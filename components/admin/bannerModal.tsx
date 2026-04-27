"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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

type BannerModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
  editData: Banner | null;
};

export default function BannerModal({
  open,
  setOpen,
  refresh,
  editData,
}: BannerModalProps) {
  const [form, setForm] = useState<{
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    image: File | null;
    preview: string;
  }>({
    title: "",
    subtitle: "",
    ctaText: "",
    ctaLink: "",
    image: null,
    preview: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        image: null,
        preview: editData.imageUrl,
      });
    }
  }, [editData]);

  const handleSubmit = async () => {
    let imageUrl = form.preview;

    if (form.image) {
      const fd = new FormData();
      fd.append("file", form.image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      imageUrl = data.url;
    }

    await fetch(editData ? `/api/banner/${editData.id}` : "/api/banner", {
      method: editData ? "PUT" : "POST",
      body: JSON.stringify({
        ...form,
        imageUrl,
      }),
    });

    toast.success(editData ? "Updated" : "Created");

    setOpen(false);
    refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <Input
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        <Input
          placeholder="CTA Text"
          value={form.ctaText}
          onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
        />

        <Input
          placeholder="CTA Link"
          value={form.ctaLink}
          onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setForm({
              ...form,
              image: file,
              preview: URL.createObjectURL(file),
            });
          }}
        />

        {/* Preview */}
        {form.preview && (
          <img
            src={form.preview}
            className="w-full h-40 object-cover rounded"
          />
        )}

        <Button onClick={handleSubmit}>{editData ? "Update" : "Create"}</Button>
      </DialogContent>
    </Dialog>
  );
}
