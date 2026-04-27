"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface HomePageData {
  stats: Array<{
    number: string;
    label: string;
    prefix: string;
    suffix: string;
  }>;
  about: {
    sectionLabel: string;
    heading: string;
    points: string[];
    description: string;
    badges: string[];
  };
  vision: {
    missionTitle: string;
    missionText: string;
    coreValuesTitle: string;
    coreValuesText: string;
  };
  productGuide: {
    heading: string;
    subheading: string;
    buttonText: string;
  };
  contactBar: {
    headOffice: { title: string; line1: string; line2: string };
    salesEnquiries: { title: string; line1: string };
    email: { title: string; line1: string };
    certifications: { title: string; line1: string; line2: string };
  };
}

export default function HomeEditPage() {
  const router = useRouter();
  const [data, setData] = useState<HomePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/pages/home");
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError("Failed to load home page data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      setIsSaving(true);
      const res = await fetch("/api/pages/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      const result = await res.json();
      setData(result.data);
      setError(null);
      toast.success("Home page saved successfully!");
      router.push("/admin/Pages");
    } catch (err) {
      setError("Failed to save home page");
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
            Edit Home Page
          </h1>
          <p className="text-gray-500 mt-2">
            Update your homepage section content
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* ─── STATS BAR ─── */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Stats Bar</h2>
          <div className="space-y-4">
            {data.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 items-end border-b pb-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Prefix</Label>
                  <Input
                    value={stat.prefix}
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[i] = { ...stat, prefix: e.target.value };
                      setData({ ...data, stats: updated });
                    }}
                    placeholder="e.g. ISO"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Number</Label>
                  <Input
                    value={stat.number}
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[i] = { ...stat, number: e.target.value };
                      setData({ ...data, stats: updated });
                    }}
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Suffix</Label>
                  <Input
                    value={stat.suffix}
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[i] = { ...stat, suffix: e.target.value };
                      setData({ ...data, stats: updated });
                    }}
                    placeholder="e.g. +"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Label</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[i] = { ...stat, label: e.target.value };
                      setData({ ...data, stats: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ─── ABOUT TUK SECTION ─── */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">About TUK Section</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">Section Label</Label>
              <Input
                value={data.about.sectionLabel}
                onChange={(e) =>
                  setData({ ...data, about: { ...data.about, sectionLabel: e.target.value } })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Heading</Label>
              <Input
                value={data.about.heading}
                onChange={(e) =>
                  setData({ ...data, about: { ...data.about, heading: e.target.value } })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Bullet Points
              </Label>
              <div className="space-y-2">
                {data.about.points.map((point, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={point}
                      onChange={(e) => {
                        const updated = [...data.about.points];
                        updated[i] = e.target.value;
                        setData({ ...data, about: { ...data.about, points: updated } });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = data.about.points.filter((_, idx) => idx !== i);
                        setData({ ...data, about: { ...data.about, points: updated } });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() =>
                    setData({
                      ...data,
                      about: { ...data.about, points: [...data.about.points, ""] },
                    })
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add Point
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Description</Label>
              <Textarea
                value={data.about.description}
                rows={3}
                onChange={(e) =>
                  setData({ ...data, about: { ...data.about, description: e.target.value } })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Badges</Label>
              <div className="space-y-2">
                {data.about.badges.map((badge, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={badge}
                      onChange={(e) => {
                        const updated = [...data.about.badges];
                        updated[i] = e.target.value;
                        setData({ ...data, about: { ...data.about, badges: updated } });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = data.about.badges.filter((_, idx) => idx !== i);
                        setData({ ...data, about: { ...data.about, badges: updated } });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() =>
                    setData({
                      ...data,
                      about: { ...data.about, badges: [...data.about.badges, ""] },
                    })
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add Badge
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* ─── MISSION & CORE VALUES ─── */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Mission & Core Values</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">Mission Title</Label>
              <Input
                value={data.vision.missionTitle}
                onChange={(e) =>
                  setData({ ...data, vision: { ...data.vision, missionTitle: e.target.value } })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Mission Text</Label>
              <Textarea
                value={data.vision.missionText}
                rows={4}
                onChange={(e) =>
                  setData({ ...data, vision: { ...data.vision, missionText: e.target.value } })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Core Values Title</Label>
              <Input
                value={data.vision.coreValuesTitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    vision: { ...data.vision, coreValuesTitle: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Core Values Text</Label>
              <Textarea
                value={data.vision.coreValuesText}
                rows={4}
                onChange={(e) =>
                  setData({
                    ...data,
                    vision: { ...data.vision, coreValuesText: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </Card>

        {/* ─── PRODUCT GUIDE ─── */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Product Guide Section</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">Heading</Label>
              <Input
                value={data.productGuide.heading}
                onChange={(e) =>
                  setData({
                    ...data,
                    productGuide: { ...data.productGuide, heading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Subheading</Label>
              <Textarea
                value={data.productGuide.subheading}
                rows={2}
                onChange={(e) =>
                  setData({
                    ...data,
                    productGuide: { ...data.productGuide, subheading: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">Button Text</Label>
              <Input
                value={data.productGuide.buttonText}
                onChange={(e) =>
                  setData({
                    ...data,
                    productGuide: { ...data.productGuide, buttonText: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </Card>

        {/* ─── CONTACT BAR (FOOTER CARDS) ─── */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Contact Info Bar</h2>
          <div className="space-y-6">
            {/* Head Office */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Head Office</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Title</Label>
                  <Input
                    value={data.contactBar.headOffice.title}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          headOffice: { ...data.contactBar.headOffice, title: e.target.value },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Line 1</Label>
                  <Input
                    value={data.contactBar.headOffice.line1}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          headOffice: { ...data.contactBar.headOffice, line1: e.target.value },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Line 2</Label>
                  <Input
                    value={data.contactBar.headOffice.line2}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          headOffice: { ...data.contactBar.headOffice, line2: e.target.value },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Sales Enquiries */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Sales Enquiries</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Title</Label>
                  <Input
                    value={data.contactBar.salesEnquiries.title}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          salesEnquiries: {
                            ...data.contactBar.salesEnquiries,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Phone</Label>
                  <Input
                    value={data.contactBar.salesEnquiries.line1}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          salesEnquiries: {
                            ...data.contactBar.salesEnquiries,
                            line1: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Email</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Title</Label>
                  <Input
                    value={data.contactBar.email.title}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          email: { ...data.contactBar.email, title: e.target.value },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Email Address</Label>
                  <Input
                    value={data.contactBar.email.line1}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          email: { ...data.contactBar.email, line1: e.target.value },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Certifications</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Title</Label>
                  <Input
                    value={data.contactBar.certifications.title}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          certifications: {
                            ...data.contactBar.certifications,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Line 1</Label>
                  <Input
                    value={data.contactBar.certifications.line1}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          certifications: {
                            ...data.contactBar.certifications,
                            line1: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Line 2</Label>
                  <Input
                    value={data.contactBar.certifications.line2}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactBar: {
                          ...data.contactBar,
                          certifications: {
                            ...data.contactBar.certifications,
                            line2: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6">
          <Button variant="outline" onClick={() => router.back()}>
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
