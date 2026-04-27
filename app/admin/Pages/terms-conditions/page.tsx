"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface Section {
  id: string;
  title: string;
  content: string[];
  subsections?: Array<{
    subtitle: string;
    content: string;
  }>;
}

interface TermsPageData {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  sections: Section[];
}

export default function TermsEditPage() {
  const router = useRouter();
  const [data, setData] = useState<TermsPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTermsPage();
  }, []);

  const fetchTermsPage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/pages/terms-conditions");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError("Failed to load terms page data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      setIsSaving(true);
      const response = await fetch("/api/pages/terms-conditions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");
      const result = await response.json();
      setData(result.data);
      setError(null);
      toast.success("Terms page saved successfully!");
      router.push("/admin/Pages");
    } catch (err) {
      setError("Failed to save terms page");
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
            Edit Terms & Conditions
          </h1>
          <p className="text-gray-500 mt-2">
            Update your terms and conditions content
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
                Page Subtitle
              </Label>
              <Textarea
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        </Card>

        {/* Sections */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Page Sections</h2>
          <div className="space-y-6">
            {data.sections.map((section, sectionIndex) => (
              <Card
                key={sectionIndex}
                className="p-6 bg-gray-50 border border-gray-200"
              >
                <div className="space-y-4">
                  {/* Section ID and Title */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold mb-1 block">
                        Section ID
                      </Label>
                      <Input
                        value={section.id}
                        onChange={(e) => {
                          const updated = [...data.sections];
                          updated[sectionIndex] = {
                            ...section,
                            id: e.target.value,
                          };
                          setData({ ...data, sections: updated });
                        }}
                        placeholder="e.g., uk, overseas"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold mb-1 block">
                        Section Title
                      </Label>
                      <Input
                        value={section.title}
                        onChange={(e) => {
                          const updated = [...data.sections];
                          updated[sectionIndex] = {
                            ...section,
                            title: e.target.value,
                          };
                          setData({ ...data, sections: updated });
                        }}
                      />
                    </div>
                  </div>

                  {/* Main Content */}
                  {section.content.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      <Label className="text-sm font-semibold mb-1 block">
                        Content {contentIndex + 1}
                      </Label>
                      <Textarea
                        value={contentItem}
                        onChange={(e) => {
                          const updated = [...data.sections];
                          const updatedContent = [...section.content];
                          updatedContent[contentIndex] = e.target.value;
                          updated[sectionIndex] = {
                            ...section,
                            content: updatedContent,
                          };
                          setData({ ...data, sections: updated });
                        }}
                        rows={2}
                      />
                    </div>
                  ))}

                  {/* Add Content Button */}
                  {section.content.length < 3 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const updated = [...data.sections];
                        updated[sectionIndex] = {
                          ...section,
                          content: [...section.content, ""],
                        };
                        setData({ ...data, sections: updated });
                      }}
                    >
                      Add Content
                    </Button>
                  )}

                  {/* Subsections */}
                  {section.subsections && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <h4 className="font-semibold text-sm">Subsections</h4>
                      {section.subsections.map((subsection, subIndex) => (
                        <Card key={subIndex} className="p-3 bg-white">
                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs font-semibold mb-1 block">
                                Subtitle
                              </Label>
                              <Input
                                value={subsection.subtitle}
                                onChange={(e) => {
                                  const updated = [...data.sections];
                                  const updatedSubs = [
                                    ...(section.subsections || []),
                                  ];
                                  updatedSubs[subIndex] = {
                                    ...subsection,
                                    subtitle: e.target.value,
                                  };
                                  updated[sectionIndex] = {
                                    ...section,
                                    subsections: updatedSubs,
                                  };
                                  setData({ ...data, sections: updated });
                                }}
                                />
                            </div>
                            <div>
                              <Label className="text-xs font-semibold mb-1 block">
                                Content
                              </Label>
                              <Textarea
                                value={subsection.content}
                                onChange={(e) => {
                                  const updated = [...data.sections];
                                  const updatedSubs = [
                                    ...(section.subsections || []),
                                  ];
                                  updatedSubs[subIndex] = {
                                    ...subsection,
                                    content: e.target.value,
                                  };
                                  updated[sectionIndex] = {
                                    ...section,
                                    subsections: updatedSubs,
                                  };
                                  setData({ ...data, sections: updated });
                                }}
                                rows={3}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>

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
