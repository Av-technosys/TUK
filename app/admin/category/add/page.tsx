"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function EditCategoryPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  // ✅ FETCH DATA ON LOAD
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/category/${params.id}`);
      const data = await res.json();

      // console.log("EDIT DATA:", data); // debug

      setForm({
        name: data.name || "",
        slug: data.slug || "",
        description: data.description || "",
        image: data.image || "",
      });

      setLoading(false);
    };

    if (params.id) fetchData();
  }, [params.id]);

  // ✅ UPDATE API
  const handleUpdate = async () => {
    await fetch(`/api/category/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    router.push("/admin/category");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">Edit Category</h1>

          {/* NAME */}
          <Input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* SLUG */}
          <Input
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
          />

          {/* IMAGE */}
          <Input
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          {/* IMAGE PREVIEW */}
          {form.image && (
            <img
              src={form.image}
              className="w-24 h-24 rounded object-cover"
            />
          )}

          {/* DESCRIPTION */}
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          {/* UPDATE BUTTON */}
          <Button onClick={handleUpdate} className="w-full">
            Update Category
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}