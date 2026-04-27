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

interface Section {
  title: string;
  content?: string;
  subsections?: Array<{
    subtitle: string;
    content: string;
  }>;
}

interface PrivacyPolicyData {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  sections: Section[];
}

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [data, setData] = useState<PrivacyPolicyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/pages/privacy-policy");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError("Failed to load privacy policy data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      setIsSaving(true);
      const response = await fetch("/api/pages/privacy-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");
      const result = await response.json();
      setData(result.data);
      setError(null);
      toast.success("Privacy Policy saved successfully!");
      router.push("/admin/Pages");
    } catch (err) {
      setError("Failed to save privacy policy");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleChange = (value: string) => {
    if (data) setData({ ...data, title: value });
  };

  const handleSubtitleChange = (value: string) => {
    if (data) setData({ ...data, subtitle: value });
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    if (data) {
      const updatedSections = [...data.sections];
      updatedSections[index] = {
        ...updatedSections[index],
        [field]: value,
      };
      setData({ ...data, sections: updatedSections });
    }
  };

  const handleSubsectionChange = (
    sectionIndex: number,
    subsectionIndex: number,
    field: string,
    value: string,
  ) => {
    if (data) {
      const updatedSections = [...data.sections];
      const section = updatedSections[sectionIndex];
      if (section.subsections) {
        const updatedSubsections = [...section.subsections];
        updatedSubsections[subsectionIndex] = {
          ...updatedSubsections[subsectionIndex],
          [field]: value,
        };
        updatedSections[sectionIndex] = {
          ...section,
          subsections: updatedSubsections,
        };
        setData({ ...data, sections: updatedSections });
      }
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
    <div className="w-full p-6 bg-gray-50 min-h-screen font-poppins">
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
            Edit Privacy Policy
          </h1>
          <p className="text-gray-500 mt-2">
            Update your privacy policy content
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Main Content Card */}
      <Card className="p-8 bg-white">
        <div className="space-y-8">
          {/* Title Section */}
          <div>
            <Label htmlFor="title" className="text-lg font-semibold mb-2 block">
              Page Title
            </Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-xl font-semibold"
            />
          </div>

          {/* Subtitle Section */}
          <div>
            <Label
              htmlFor="subtitle"
              className="text-lg font-semibold mb-2 block"
            >
              Subtitle
            </Label>
            <Textarea
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              rows={2}
              className="text-base"
            />
          </div>

          {/* Divider */}
          <hr className="my-6" />

          {/* Sections */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Page Sections</h2>
            <div className="space-y-8">
              {data.sections.map((section, sectionIndex) => (
                <Card key={sectionIndex} className="p-6 bg-gray-50">
                  {/* Section Title */}
                  <div className="mb-4">
                    <Label className="text-base font-semibold mb-2 block">
                      Section {sectionIndex + 1} Title
                    </Label>
                    <Input
                      value={section.title}
                      onChange={(e) =>
                        handleSectionChange(
                          sectionIndex,
                          "title",
                          e.target.value,
                        )
                      }
                      className="font-semibold"
                    />
                  </div>

                  {/* Section Content */}
                  {section.content && !section.subsections && (
                    <div>
                      <Label className="text-base font-semibold mb-2 block">
                        Section Content
                      </Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) =>
                          handleSectionChange(
                            sectionIndex,
                            "content",
                            e.target.value,
                          )
                        }
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}

                  {/* Subsections */}
                  {section.subsections && (
                    <div className="space-y-4 ml-4">
                      {section.subsections.map((subsection, subIndex) => (
                        <Card
                          key={subIndex}
                          className="p-4 bg-white border border-gray-200"
                        >
                          <div className="mb-3">
                            <Label className="text-sm font-semibold mb-1 block">
                              Subsection Title
                            </Label>
                            <Input
                              value={subsection.subtitle}
                              onChange={(e) =>
                                handleSubsectionChange(
                                  sectionIndex,
                                  subIndex,
                                  "subtitle",
                                  e.target.value,
                                )
                              }
                              className="text-sm font-semibold"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-semibold mb-1 block">
                              Subsection Content
                            </Label>
                            <Textarea
                              value={subsection.content}
                              onChange={(e) =>
                                handleSubsectionChange(
                                  sectionIndex,
                                  subIndex,
                                  "content",
                                  e.target.value,
                                )
                              }
                              rows={4}
                              className="text-sm font-mono"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button variant="outline" onClick={() => router.push("/admin/Pages")}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="gap-2">
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
