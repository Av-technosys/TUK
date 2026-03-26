"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EnquiryModal() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    spend: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Enquiry sent successfully 🚀");

        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          product: "",
          spend: "",
          message: "",
        });
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-full bg-[#1E3A8A] hover:bg-[#1E3A8A] text-xs px-6 h-8">
          Enquiries
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-xl p-6">
        <DialogTitle className="text-lg font-semibold">Enquiries</DialogTitle>

        <div className="space-y-4 mt-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="">Full Name</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
              />
            </div>
            <div>
              <label htmlFor="">Company Name</label>
              <Input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Enter Company Name"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="">Email</label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
              />
            </div>
            <div>
              <label htmlFor="">Phone</label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter Phone no."
              />
            </div>
          </div>

          {/* Product */}
          <Input
            name="product"
            value={form.product}
            onChange={handleChange}
            placeholder="Product of Interest"
          />

          {/* Spend */}
          <Input
            name="spend"
            value={form.spend}
            onChange={handleChange}
            placeholder="Typical Annual Spend on TUK"
          />

          {/* Message */}
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Other Comments / Info"
          />

          {/* Fake captcha (UI only like image) */}
          <div className="border rounded-md p-3 flex items-center gap-2 text-sm">
            <input type="checkbox" />
            I'm not a robot
          </div>

          {/* Button */}
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#1E3A8A] rounded-full"
          >
            SEND
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
