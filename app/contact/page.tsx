"use client"

import React, { useState } from "react"
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconSend,
  IconMapPinFilled,
  IconPhoneFilled,
  IconMailFilled,
  IconFileDescriptionFilled
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import Footer from "@/components/common/footer"
import Header from "@/components/common/header"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill required fields");
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
  return (<>
  <Header/>
    <section className="w-full bg-gray-100 font-poppins">

      {/* HEADER */}
      <div
  className="w-full text-white py-16"
  style={{
    background: "linear-gradient(to right, #141D3D, #364FA3)"
  }}
>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-sm font-light opacity-90">
            Get in touch with our expert team for voice and data cabling solutions, <br />
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
            <div className="p-2 rounded-md bg-[#2596BE1A]">
              <IconMapPinFilled className="text-[#2596BE]" />
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Our Address</p>
              <p>Your business address here</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex gap-4">
             <div className="p-2 rounded-md bg-[#2596BE1A]">
              <IconPhoneFilled className="text-[#2596BE]" />
            </div>
            {/* <IconPhone className="text-[#1E3A8A]" /> */}
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Phone</p>
              <p>+91 000000000</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex gap-4">
           <div className="p-2 rounded-md bg-[#2596BE1A]">
              <IconMailFilled className="text-[#2596BE]" />
            </div>
            {/* <IconMail className="text-[#1E3A8A]" /> */}
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Email</p>
              <p>support@email.com</p>
            </div>
          </div>

          {/* MAP */}
          <div className="w-full h-64 rounded-xl overflow-hidden shadow">
            <iframe
              src="https://maps.google.com/maps?q=26.906008,75.748697&z=15&output=embed"
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

            <Button className="bg-[#0300A7] py-6 rounded-full   hover:bg-blue-900 w-full flex items-center justify-center gap-2">
            <IconFileDescriptionFilled size={18} />
            REQUEST A QUOTE
          </Button>

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
          placeholder="Full Name"
          className="border rounded-lg px-4 py-3 text-sm w-full"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="border rounded-lg px-4 py-3 text-sm w-full"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border rounded-lg px-4 py-3 text-sm w-full"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
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
        <option value="">Select Inquiry</option>
        <option value="product">Product enquiry</option>
        <option value="service">Service inquiry</option>
        <option value="general">General inquiry</option>
      </select>

      {/* Message */}
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
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
          <span className="text-blue-600 underline">Terms & Conditions</span> and{" "}
          <span className="text-blue-600 underline">Privacy Policy</span>.
        </span>
      </label>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        className="bg-[#0300A7] py-6 rounded-full hover:bg-blue-900 w-full flex items-center justify-center gap-2"
      >
        <IconSend size={18} />
        SEND MESSAGE
      </Button>
    </div>

      </div>

    </section>
    <Footer/>
  </>)
}

export default Page