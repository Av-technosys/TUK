"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { error } from "console";

export default function AddDistributor() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    visitUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Upload Image
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "distributors");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      setForm((prev) => ({
        ...prev,
        image: data.url,
      }));

      setPreview(data.url);

      toast.success("Image uploaded successfully ✅");
    } catch (err) {
      toast.error("Upload failed ");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit Form
  const handleSubmit = async () => {
    if (!form.name || !form.slug) {
      toast.error("Name and slug are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/distributors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to save");

      toast.success("Distributor added successfully 🎉");

      // redirect after short delay (better UX)
      setTimeout(() => {
        router.push("/admin/distributors");
        router.refresh();
      }, 800);
    } catch (err) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-md ml-4 ">
      <h2 className="text-xl font-semibold">Add Distributor</h2>

      <div className="space-y-4 ml-10">
        <div className="">
          <label className="block text-lg font-medium mb-2">Name</label>
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Slug</label>
          <Input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">Description</label>
          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-lg font-medium mb-2">Logo Image</label>
          <input
            type="file"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) {
                setFile(selected);
                setPreview(URL.createObjectURL(selected));
              }
            }}
          />
        </div>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-24 h-24 object-cover rounded"
          />
        )}

        <Button
          className="cursor-pointer"
          type="button"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Logo"}
        </Button>

        <div>
          <label className="block text-lg font-medium mb-2">Visit URL</label>
          <Input
            placeholder="Visit URL"
            value={form.visitUrl}
            onChange={(e) => setForm({ ...form, visitUrl: e.target.value })}
          />
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className=" cursor-pointer w-full"
        >
          {loading ? "Saving..." : "Save Distributor"}
        </Button>
      </div>
    </div>
  );
}
