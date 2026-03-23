"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddDistributor() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // ✅ Upload to your existing /api/upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "distributors"); // optional if dynamic

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Upload failed");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: data.url,
    }));

    setPreview(data.url);
  };

  // ✅ Save distributor
  const handleSubmit = async () => {
    if (!form.name || !form.slug) {
      alert("Name and slug are required");
      return;
    }

    const res = await fetch("/api/distributors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      
    });

    if (!res.ok) {
      router.push("/admin/distributors");
      alert("Error saving distributor");
      return;
      
    };
    

    // reset form
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
    });
    setPreview("");
    setFile(null);
  };

  return (
    <div className="p-6 space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Add Distributor</h2>

      {/* Name */}
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/* Slug */}
      <Input
        placeholder="Slug"
        value={form.slug}
        onChange={(e) =>
          setForm({ ...form, slug: e.target.value })
        }
      />

      {/* Description */}
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      {/* File Upload */}
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

      {/* Preview */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-24 h-24 object-cover rounded"
        />
      )}

      {/* Upload Button */}
      <Button type="button" onClick={handleUpload}>
        Upload Logo
      </Button>

      {/* Save Button */}
      <Button onClick={handleSubmit}>
        Save Distributor
      </Button>
    </div>
  );
}