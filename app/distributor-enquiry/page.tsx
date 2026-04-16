"use client";

import React, { useState } from "react";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconSend,
  IconMapPinFilled,
  IconPhoneFilled,
  IconMailFilled,
  IconFileDescriptionFilled,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from "@/src/lib/validation";

const Page = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // ✅ Only numbers for phone
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, phone: numericValue });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill required fields");
      return;
    }
    if (!validateRequired(form.name)) {
      toast.error("Full Name is required");
      return;
    }

    if (!validateRequired(form.company)) {
      toast.error("Company is required");
      return;
    }

    if (!validateRequired(form.email)) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validateRequired(form.phone)) {
      toast.error("Phone number is required");
      return;
    }

    if (!validatePhone(form.phone)) {
      toast.error("Enter valid 10 digit phone number");
      return;
    }

    if (!validateRequired(form.inquiry)) {
      toast.error("Please select inquiry type");
      return;
    }

    if (!validateRequired(form.message)) {
      toast.error("Message is required");
      return;
    }

    if (!isChecked) {
      toast.error("Please accept terms");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully 🎉");

        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          inquiry: "",
          message: "",
        });
        setIsChecked(false);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Header />
      <section className="w-full bg-gray-100 font-poppins">
        {/* HEADER */}
        <div
          className="w-full text-white py-16"
          style={{
            background: "linear-gradient(to right, #141D3D, #364FA3)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
            <h1 className="text-3xl font-bold">Become a Distributor</h1>
            <p className="text-sm font-light opacity-90">
              Get in touch with our expert team for voice and data cabling
              solutions, <br />
              technical support, or bespoke requirements.
            </p>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="max-w-5xl mx-auto px-6 py-16 grid xl:grid-cols-12 gap-12">
          {/* LEFT SIDE */}
          <div className="space-y-8 xl:col-span-6">
            <h2 className="text-xl font-semibold">Get In Touch</h2>

            {/* ADDRESS */}
            <div className="flex gap-4">
              <div className="p-2 h-10 rounded-md bg-[#2596BE1A]">
                <IconMapPinFilled className="text-[#2596BE]" />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Our Address</p>
                <p>
                  Unit 4, Wimbledon Stadium Business Centre, Riverside Road,
                  London SW17 0BA
                </p>
              </div>
            </div>

            {/* PHONE */}
           {/* PHONE */}
            <a 
              href="tel:+442089466688" 
              className="flex gap-4 cursor-pointer group"
            >
              <div className="p-2 rounded-md bg-[#2596BE1A]">
                <IconPhoneFilled className="text-[#2596BE]" />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Phone</p>
                <p className="group-hover:underline">+44 (0) 20 8946 6688</p>
              </div>
            </a>

            {/* EMAIL */}
            <a 
              href="mailto:sales@tuk.co.uk" 
              className="flex gap-4 cursor-pointer group"
            >
              <div className="p-2 rounded-md bg-[#2596BE1A]">
                <IconMailFilled className="text-[#2596BE]" />
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Email</p>
                <p className="group-hover:underline">sales@tuk.co.uk</p>
              </div>
            </a>
            {/* MAP */}
            <div className="w-full h-64 rounded-xl overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps?q=51.43319,-0.19002&hl=en&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* ✅ UPDATED QUOTE CARD */}
            <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Need a fast quote?
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                Click below to jump to our quick quote request form.
              </p>

              <Link href="/request-quote">
                <Button className="bg-[#0300A7] cursor-pointer py-6 rounded-full   hover:bg-blue-900 w-full flex items-center justify-center gap-2">
                  <IconFileDescriptionFilled size={18} />
                  REQUEST A QUOTE
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white p-8 rounded-xl shadow space-y-6 xl:col-span-6 h-fit">
            <h2 className="text-xl font-semibold">Send us a message</h2>

            {/* Name + Company */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name*"
                className="border rounded-lg px-4 py-3 text-sm w-full"
              />

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company*"
                className="border rounded-lg px-4 py-3 text-sm w-full"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address*"
                className="border rounded-lg px-4 py-3 text-sm w-full"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number*"
                maxLength={10}
                inputMode="numeric"
                className="border rounded-lg px-4 py-3 text-sm w-full"
              />
            </div>

            {/* Inquiry */}
            <select
              name="inquiry"
              value={form.inquiry}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3 text-sm w-full"
            >
              <option value="">Select Enquiry</option>
              <option value="product">Product </option>
              <option value="service">Service </option>
              <option value="general">General </option>
            </select>

            {/* Message */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message*"
              className="border rounded-lg px-4 py-3 text-sm w-full h-32"
            />

            {/* Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-1"
              />

              <span className="text-sm">
                I agree to the{" "}
                <span className="text-blue-600 underline">
                  <Link href="/terms-conditions">Terms & Conditions</Link>
                </span>{" "}
                and{" "}
                <span className="text-blue-600 underline">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </span>
                .
              </span>
            </label>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              className="bg-[#0300A7] cursor-pointer py-6 rounded-full hover:bg-blue-900 w-full flex items-center justify-center gap-2"
            >
              <IconSend size={18} />
              SEND MESSAGE
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
