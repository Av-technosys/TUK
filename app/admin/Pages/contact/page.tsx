"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ContactPageData {
  id: string;
  title: string;
  slug: string;
  hero: {
    title: string;
    subtitle: string;
  };
  contactInfo: {
    heading: string;
    address: {
      label: string;
      value: string;
    };
    phone: {
      label: string;
      value: string;
    };
    email: {
      label: string;
      value: string;
    };
  };
  // formInfo: {
  //   heading: string;
  //   description: string;
  //   inquiryTypes: Array<{ value: string; label: string }>;
  // };
}

export default function ContactEditPage() {
  const router = useRouter();
  const [data, setData] = useState<ContactPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContactPage();
  }, []);

  const fetchContactPage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/pages/contact");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError("Failed to load contact page data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      setIsSaving(true);
      const response = await fetch("/api/pages/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");
      const result = await response.json();
      setData(result.data);
      setError(null);
      toast.success("Contact page saved successfully!");
      router.push("/admin/Pages");
    } catch (err) {
      setError("Failed to save contact page");
      toast.error("Failed to save");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error || "Failed to load data"}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen font-barlow">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/Pages")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Edit Contact Page
          </h1>
          <p className="text-gray-500 mt-2">
            Update your contact page information
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* Hero Section */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Page Title
              </Label>
              <Input
                value={data.hero.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Page Subtitle
              </Label>
              <Textarea
                value={data.hero.subtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, subtitle: e.target.value },
                  })
                }
                rows={2}
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Section Heading
              </Label>
              <Input
                value={data.contactInfo.heading}
                onChange={(e) =>
                  setData({
                    ...data,
                    contactInfo: {
                      ...data.contactInfo,
                      heading: e.target.value,
                    },
                  })
                }
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Address Label
                </Label>
                <Input
                  value={data.contactInfo.address.label}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contactInfo: {
                        ...data.contactInfo,
                        address: {
                          ...data.contactInfo.address,
                          label: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Address Value
                </Label>
                <Input
                  value={data.contactInfo.address.value}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contactInfo: {
                        ...data.contactInfo,
                        address: {
                          ...data.contactInfo.address,
                          value: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Phone Label
                </Label>
                <Input
                  value={data.contactInfo.phone.label}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contactInfo: {
                        ...data.contactInfo,
                        phone: {
                          ...data.contactInfo.phone,
                          label: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Phone Number
                </Label>
                <Input
                  value={data.contactInfo.phone.value}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contactInfo: {
                        ...data.contactInfo,
                        phone: {
                          ...data.contactInfo.phone,
                          value: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Email Label
                </Label>
                <Input
                  value={data.contactInfo.email.label}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contactInfo: {
                        ...data.contactInfo,
                        email: {
                          ...data.contactInfo.email,
                          label: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label className="text-sm font-semibold mb-2 block">
                  Email Address
                </Label>
                <Input
                  value={data.contactInfo.email.value}
                  onChange={(e) =>
                    setData({
                      ...data,
                      contactInfo: {
                        ...data.contactInfo,
                        email: {
                          ...data.contactInfo.email,
                          value: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Form Information */}


        {/* Action Buttons */}
        <div className="flex gap-3 pt-6">
          <Button variant="outline" onClick={() => router.push("/admin/Pages")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
