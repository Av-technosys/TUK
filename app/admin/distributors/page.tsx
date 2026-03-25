"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DistributorList() {
  const [data, setData] = useState([]);

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

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Distributors</h2>
        <Link href="/admin/distributors/add">
          <Button>Add Distributor</Button>
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item: any) => (
            <tr key={item.id} className="border-b text-center">
<td>{item.image && <img src={item.image} alt={item.name} className="h-16 w-16 object-contain -mr-14 ml-10 " />}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td className="space-x-2">
                <Link href={`/admin/distributors/edit/${item.id}`}>
                  <Button size="sm">Edit</Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}