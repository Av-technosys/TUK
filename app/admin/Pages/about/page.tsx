"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface AboutPageData {
  id: string;
  title: string;
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    badges: Array<{ icon: string; text: string }>;
  };
  heritage: {
    subtitle: string;
    title: string;
    content: string[];
    image: string;
    experience: string;
    experienceText: string;
  };
  mission: {
    title: string;
    description: string;
    bigImage: string;
    smallImage: string;
  };
  iso: {
    title: string;
    certNumber: string;
    description: string;
  };
  coreValues: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  weee: {
    title: string;
    description: string;
    cards: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export default function AboutEditPage() {
  const router = useRouter();
  const [data, setData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchAboutPage();
  }, []);

  const fetchAboutPage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/pages/about");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setImagePreview(result.heritage.image);
      setError(null);
    } catch (err) {
      setError("Failed to load about page data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const result = await response.json();

      // Update preview and data
      setImagePreview(result.url);
      if (data) {
        setData({
          ...data,
          heritage: {
            ...data.heritage,
            image: result.url,
          },
        });
      }
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      setIsSaving(true);
      const response = await fetch("/api/pages/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save");
      const result = await response.json();
      setData(result.data);
      setError(null);
      toast.success("About page saved successfully!");
      router.push("/admin/Pages");
    } catch (err) {
      setError("Failed to save about page");
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
          <h1 className="text-3xl font-bold tracking-tight">Edit About Page</h1>
          <p className="text-gray-500 mt-2">Update your about page content</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Main Content Card */}
      <div className="space-y-8">
        {/* HERO SECTION */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="heroTitle"
                className="text-base font-semibold mb-2 block"
              >
                Hero Title
              </Label>
              <Input
                id="heroTitle"
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
              <Label
                htmlFor="heroSubtitle"
                className="text-base font-semibold mb-2 block"
              >
                Hero Subtitle
              </Label>
              <Textarea
                id="heroSubtitle"
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

        {/* HERITAGE SECTION */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Heritage Section</h2>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="heritageSubtitle"
                className="text-base font-semibold mb-2 block"
              >
                Subtitle (e.g., "Established 1984")
              </Label>
              <Input
                id="heritageSubtitle"
                value={data.heritage.subtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    heritage: { ...data.heritage, subtitle: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label
                htmlFor="heritageTitle"
                className="text-base font-semibold mb-2 block"
              >
                Heritage Title
              </Label>
              <Input
                id="heritageTitle"
                value={data.heritage.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    heritage: { ...data.heritage, title: e.target.value },
                  })
                }
              />
            </div>

            {/* Heritage Content - Three paragraphs */}
            {data.heritage.content.map((paragraph, index) => (
              <div key={index}>
                <Label className="text-base font-semibold mb-2 block">
                  Paragraph {index + 1}
                </Label>
                <Textarea
                  value={paragraph}
                  onChange={(e) => {
                    const updatedContent = [...data.heritage.content];
                    updatedContent[index] = e.target.value;
                    setData({
                      ...data,
                      heritage: { ...data.heritage, content: updatedContent },
                    });
                  }}
                  rows={4}
                />
              </div>
            ))}

            {/* Image Upload */}
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Heritage Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="hidden"
                  id="imageInput"
                />
                <label htmlFor="imageInput" className="cursor-pointer">
                  {isUploadingImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload image
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Heritage preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      if (data) {
                        setData({
                          ...data,
                          heritage: { ...data.heritage, image: "" },
                        });
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Experience Badge */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Experience Number
                </Label>
                <Input
                  value={data.heritage.experience}
                  onChange={(e) =>
                    setData({
                      ...data,
                      heritage: {
                        ...data.heritage,
                        experience: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Experience Text
                </Label>
                <Input
                  value={data.heritage.experienceText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      heritage: {
                        ...data.heritage,
                        experienceText: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* MISSION SECTION */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Mission Section</h2>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="missionTitle"
                className="text-base font-semibold mb-2 block"
              >
                Mission Title
              </Label>
              <Input
                id="missionTitle"
                value={data.mission.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    mission: { ...data.mission, title: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label
                htmlFor="missionDesc"
                className="text-base font-semibold mb-2 block"
              >
                Mission Description
              </Label>
              <Textarea
                id="missionDesc"
                value={data.mission.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    mission: { ...data.mission, description: e.target.value },
                  })
                }
                rows={4}
              />
            </div>

            {/* Big Image Upload */}
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Mission Big Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setIsUploadingImage(true);
                      const formData = new FormData();
                      formData.append("file", file);
                      const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      });
                      if (!response.ok) throw new Error("Upload failed");
                      const result = await response.json();
                      setData({
                        ...data,
                        mission: { ...data.mission, bigImage: result.url },
                      });
                      toast.success("Big image uploaded");
                    } catch (err) {
                      toast.error("Failed to upload");
                    } finally {
                      setIsUploadingImage(false);
                    }
                  }}
                  disabled={isUploadingImage}
                  className="hidden"
                  id="missionBigImage"
                />
                <label htmlFor="missionBigImage" className="cursor-pointer">
                  {isUploadingImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload big image
                      </p>
                    </div>
                  )}
                </label>
              </div>
              {data.mission.bigImage && (
                <div className="mt-2 relative">
                  <img
                    src={data.mission.bigImage}
                    alt="Big"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        mission: { ...data.mission, bigImage: "" },
                      })
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Small Image Upload */}
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Mission Small Image
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setIsUploadingImage(true);
                      const formData = new FormData();
                      formData.append("file", file);
                      const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      });
                      if (!response.ok) throw new Error("Upload failed");
                      const result = await response.json();
                      setData({
                        ...data,
                        mission: { ...data.mission, smallImage: result.url },
                      });
                      toast.success("Small image uploaded");
                    } catch (err) {
                      toast.error("Failed to upload");
                    } finally {
                      setIsUploadingImage(false);
                    }
                  }}
                  disabled={isUploadingImage}
                  className="hidden"
                  id="missionSmallImage"
                />
                <label htmlFor="missionSmallImage" className="cursor-pointer">
                  {isUploadingImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading...
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload small image
                      </p>
                    </div>
                  )}
                </label>
              </div>
              {data.mission.smallImage && (
                <div className="mt-2 relative">
                  <img
                    src={data.mission.smallImage}
                    alt="Small"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() =>
                      setData({
                        ...data,
                        mission: { ...data.mission, smallImage: "" },
                      })
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ISO SECTION */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">ISO Section</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">
                ISO Title
              </Label>
              <Input
                value={data.iso.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    iso: { ...data.iso, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Certification Number
              </Label>
              <Input
                value={data.iso.certNumber}
                onChange={(e) =>
                  setData({
                    ...data,
                    iso: { ...data.iso, certNumber: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">
                Description
              </Label>
              <Textarea
                value={data.iso.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    iso: { ...data.iso, description: e.target.value },
                  })
                }
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* CORE VALUES SECTION */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">Core Values</h2>
          <div className="space-y-6">
            {data.coreValues.map((value, index) => (
              <Card
                key={index}
                className="p-4 bg-gray-50 border border-gray-200"
              >
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold mb-1 block">
                      Value {index + 1} - Title
                    </Label>
                    <Input
                      value={value.title}
                      onChange={(e) => {
                        const updatedValues = [...data.coreValues];
                        updatedValues[index] = {
                          ...updatedValues[index],
                          title: e.target.value,
                        };
                        setData({ ...data, coreValues: updatedValues });
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold mb-1 block">
                      Value {index + 1} - Description
                    </Label>
                    <Textarea
                      value={value.description}
                      onChange={(e) => {
                        const updatedValues = [...data.coreValues];
                        updatedValues[index] = {
                          ...updatedValues[index],
                          description: e.target.value,
                        };
                        setData({ ...data, coreValues: updatedValues });
                      }}
                      rows={2}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* WEEE SECTION */}
        <Card className="p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6">WEEE Compliance Section</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-2 block">
                WEEE Title
              </Label>
              <Input
                value={data.weee.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    weee: { ...data.weee, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label className="text-base font-semibold mb-2 block">
                WEEE Description
              </Label>
              <Textarea
                value={data.weee.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    weee: { ...data.weee, description: e.target.value },
                  })
                }
                rows={3}
              />
            </div>

            {/* WEEE Cards */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">WEEE Cards</h3>
              <div className="space-y-4">
                {data.weee.cards.map((card, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-200"
                  >
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-semibold mb-1 block">
                          Card {index + 1} - Title
                        </Label>
                        <Input
                          value={card.title}
                          onChange={(e) => {
                            const updatedCards = [...data.weee.cards];
                            updatedCards[index] = {
                              ...updatedCards[index],
                              title: e.target.value,
                            };
                            setData({
                              ...data,
                              weee: { ...data.weee, cards: updatedCards },
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold mb-1 block">
                          Card {index + 1} - Description
                        </Label>
                        <Textarea
                          value={card.description}
                          onChange={(e) => {
                            const updatedCards = [...data.weee.cards];
                            updatedCards[index] = {
                              ...updatedCards[index],
                              description: e.target.value,
                            };
                            setData({
                              ...data,
                              weee: { ...data.weee, cards: updatedCards },
                            });
                          }}
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
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
