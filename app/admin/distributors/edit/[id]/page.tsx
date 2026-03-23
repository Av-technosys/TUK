"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditDistributor() {
  const { id } = useParams();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/distributors");
      const data = await res.json();
      const item = data.find((d: any) => d.id === id);
      setForm(item);
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/distributors/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    alert("Updated!");
  };

  return (
    <div className="p-6 space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Edit Distributor</h2>

      <Input
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <Input
        value={form.slug || ""}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <Input
        value={form.image || ""}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
}