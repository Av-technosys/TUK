"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  ArrowLeft,
  Edit2,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: boolean;
};

type EditForm = Omit<Banner, "id"> & {
  imageFile: File | null;
  imagePreview: string;
};

const emptyForm = (): EditForm => ({
  title: "",
  subtitle: "",
  ctaText: "",
  ctaLink: "",
  imageUrl: "",
  isActive: true,
  imageFile: null,
  imagePreview: "",
});

export default function SliderPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  // Edit panel state
  const [editing, setEditing] = useState<Banner | null>(null); // null = new
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState<EditForm>(emptyForm());
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  /* ─── fetch ─── */
  const fetchBanners = async () => {
    try {
      setLoadingList(true);
      const res = await fetch("/api/banner");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load banners");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ─── open edit panel ─── */
  const openEdit = (banner: Banner | null) => {
    setEditing(banner);
    if (banner) {
      setForm({
        title: banner.title,
        subtitle: banner.subtitle,
        ctaText: banner.ctaText,
        ctaLink: banner.ctaLink,
        imageUrl: banner.imageUrl,
        isActive: banner.isActive,
        imageFile: null,
        imagePreview: banner.imageUrl,
      });
    } else {
      setForm(emptyForm());
    }
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditing(null);
    setForm(emptyForm());
  };

  /* ─── image upload to ImageKit ─── */
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageFile: file, imagePreview: objectUrl }));

    // Upload to ImageKit via /api/upload
    try {
      setIsUploading(true);
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((prev) => ({
        ...prev,
        imageUrl: data.url,
        imagePreview: data.url,
        imageFile: null,
      }));
      toast.success("Image uploaded to ImageKit ✓");
    } catch {
      toast.error("Image upload failed");
      setForm((prev) => ({ ...prev, imageFile: null, imagePreview: prev.imageUrl }));
    } finally {
      setIsUploading(false);
    }
  };

  /* ─── save (create / update) ─── */
  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!form.imageUrl) {
      toast.error("Please upload a banner image first");
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        ctaText: form.ctaText,
        ctaLink: form.ctaLink,
        imageUrl: form.imageUrl,
        isActive: form.isActive,
      };

      const url = editing ? `/api/banner/${editing.id}` : "/api/banner";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");

      toast.success(editing ? "Banner updated ✓" : "Banner created ✓");
      closePanel();
      fetchBanners();
    } catch {
      toast.error("Failed to save banner");
    } finally {
      setIsSaving(false);
    }
  };

  /* ─── delete ─── */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    try {
      setIsDeleting(id);
      const res = await fetch(`/api/banner/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Banner deleted");
      fetchBanners();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(null);
    }
  };

  /* ─── toggle active ─── */
  const handleToggleActive = async (banner: Banner) => {
    try {
      await fetch(`/api/banner/${banner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });
      fetchBanners();
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ════════════════════════════════════════════
      EDIT PANEL (full-screen overlay style)
  ════════════════════════════════════════════ */
  if (panelOpen) {
    return (
      <div className="w-full p-6 bg-gray-50 min-h-screen font-barlow">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={closePanel} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Banners
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {editing ? "Edit Banner" : "Add New Banner"}
            </h1>
            <p className="text-gray-500 mt-1">
              {editing ? "Update banner content and image" : "Create a new hero banner slide"}
            </p>
          </div>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* ── Image Section ── */}
          <Card className="p-8 bg-white">
            <h2 className="text-xl font-bold mb-5">Banner Image</h2>

            {/* Upload zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                id="bannerImageInput"
                className="hidden"
                onChange={handleImageSelect}
                disabled={isUploading}
              />
              <label htmlFor="bannerImageInput" className="cursor-pointer block">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 text-blue-600">
                    <Loader2 className="h-10 w-10 animate-spin" />
                    <p className="font-medium">Uploading to ImageKit…</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="font-medium">Click to upload banner image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP — recommended 1920×900px</p>
                  </div>
                )}
              </label>
            </div>

            {/* Preview */}
            {form.imagePreview && (
              <div className="mt-4 relative rounded-xl overflow-hidden shadow-md">
                <img
                  src={form.imagePreview}
                  alt="Banner preview"
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={() => setForm((p) => ({ ...p, imageUrl: "", imagePreview: "", imageFile: null }))}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition"
                >
                  <X className="h-4 w-4" />
                </button>
                {form.imageUrl && (
                  <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    ✓ Saved to ImageKit
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* ── Content Section ── */}
          <Card className="p-8 bg-white">
            <h2 className="text-xl font-bold mb-5">Banner Content</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Download Product Guide"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-2 block">Subtitle / Description</Label>
                <Textarea
                  value={form.subtitle}
                  rows={3}
                  onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                  placeholder="Short description shown below the title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-base font-semibold mb-2 block">Button Text (CTA)</Label>
                  <Input
                    value={form.ctaText}
                    onChange={(e) => setForm((p) => ({ ...p, ctaText: e.target.value }))}
                    placeholder="e.g. Browse Products →"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold mb-2 block">Button Link (CTA URL)</Label>
                  <Input
                    value={form.ctaLink}
                    onChange={(e) => setForm((p) => ({ ...p, ctaLink: e.target.value }))}
                    placeholder="e.g. /products or #product-guide"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) => setForm((p) => ({ ...p, isActive: v }))}
                  id="isActive"
                />
                <Label htmlFor="isActive" className="text-base font-semibold">
                  Active (show on homepage)
                </Label>
              </div>
            </div>
          </Card>

          {/* ── Actions ── */}
          <div className="flex gap-3 pb-10">
            <Button variant="outline" onClick={closePanel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || isUploading}
              className="gap-2 min-w-32"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSaving ? "Saving…" : editing ? "Update Banner" : "Create Banner"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════
      BANNER LIST PAGE
  ════════════════════════════════════════════ */
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen font-barlow">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hero Banners</h1>
          <p className="text-gray-500 mt-1">
            Manage homepage slider — changes reflect instantly on the site
          </p>
        </div>
        <Button onClick={() => openEdit(null)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Banner
        </Button>
      </div>

      {/* Loading */}
      {loadingList ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : banners.length === 0 ? (
        <Card className="p-12 text-center bg-white">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h3 className="font-semibold text-gray-600 mb-1">No banners yet</h3>
          <p className="text-sm text-gray-400 mb-4">Add your first hero banner to get started</p>
          <Button onClick={() => openEdit(null)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Banner
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {banners.map((banner, idx) => (
            <Card
              key={banner.id}
              className="bg-white overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image thumbnail */}
                <div className="relative w-full md:w-72 h-44 md:h-auto flex-shrink-0 bg-gray-100">
                  {banner.imageUrl ? (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon className="h-12 w-12" />
                    </div>
                  )}
                  {/* Slide number badge */}
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                    Slide {idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {banner.title || <span className="text-gray-400 italic">Untitled</span>}
                        </h3>
                        {banner.subtitle && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {banner.subtitle}
                          </p>
                        )}
                      </div>
                      {/* Active toggle */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs font-medium ${banner.isActive ? "text-green-600" : "text-gray-400"}`}>
                          {banner.isActive ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={banner.isActive}
                          onCheckedChange={() => handleToggleActive(banner)}
                        />
                      </div>
                    </div>

                    {/* CTA pill */}
                    {(banner.ctaText || banner.ctaLink) && (
                      <div className="flex items-center gap-2 flex-wrap mt-2">
                        {banner.ctaText && (
                          <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-100">
                            🔘 {banner.ctaText}
                          </span>
                        )}
                        {banner.ctaLink && (
                          <span className="inline-flex items-center bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-mono truncate max-w-xs">
                            {banner.ctaLink}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                      onClick={() => openEdit(banner)}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-1.5"
                      disabled={isDeleting === banner.id}
                      onClick={() => handleDelete(banner.id)}
                    >
                      {isDeleting === banner.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
