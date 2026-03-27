"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichEditor from "@/components/common/RichEditor";
import { toast } from "sonner";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    brand: "",
    sku: "",
    productCode: "",
  });

  const [content, setContent] = useState({
    description: "",
    usage: "",
    benefits: "",
    connectivity: "",
    safety: "",
  });

  const [categoryId, setCategoryId] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [specs, setSpecs] = useState<any[]>([{ key: "", value: "" }]);
  const [techspecs, setTechspecs] = useState<any[]>([{ key: "", value: "" }]);
  const [diTerms, setDiTerms] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [pdf, setPdf] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");

  const [loading_img, setLoadingImg] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [relatedProductsList, setRelatedProductsList] = useState<any[]>([]);
  const [selectedRelated, setselectedRelated] = useState<string>("");

  // 🔥 FETCH PRODUCT DATA
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        const product = data.product || data;

        setForm({
          name: product.name || "",
          slug: product.slug || "",
          description: product.description || "",
          shortDescription: product.shortDescription || "",
          brand: product.brand || "",
          sku: product.sku || "",
          productCode: product.productCode || "",
        });

        setCategoryId(data.categoryId || "");
        setBannerImageUrl(data.bannerImageUrl || "");

        // Features
        const featuresData = data.features?.map((f: any) => f.feature) || [""];
        setFeatures(featuresData.length > 0 ? featuresData : [""]);

        // Specifications
        const specsData = data.specifications?.map((s: any) => ({
          key: s.key,
          value: s.value,
        })) || [{ key: "", value: "" }];
        setSpecs(specsData.length > 0 ? specsData : [{ key: "", value: "" }]);
        setTechspecs(
          specsData.length > 0 ? specsData : [{ key: "", value: "" }],
        );

        // Images
        const imgUrls = data.images?.map((img: any) => img.imageUrl) || [];
        setGalleryImages(imgUrls.length > 0 ? imgUrls : []);

        // DI Terms
        const termsStr = data.diTerms?.map((d: any) => d.value).join("|") || "";
        setDiTerms(termsStr);

        // Content & PDF
        setContent(data.content || {});
        setPdf(data.pdfUrl || "");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // 📚 Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategoriesList(data);
        setRelatedProductsList(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 🖼️ Handle Banner Image Upload
  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Uploading banner image...");

    try {
      setLoadingImg(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setBannerImageUrl(data.url);

      toast.success("Banner uploaded ✅", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Banner upload failed ❌", { id: toastId });
    }

    setLoadingImg(false);
  };

  // 📄 Handle PDF Upload
  const handlePdfUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF allowed ❌");
      return;
    }

    const toastId = toast.loading("Uploading PDF...");

    try {
      setPdfLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setPdf(data.url);

      toast.success("PDF uploaded ✅", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("PDF upload failed ❌", { id: toastId });
    }

    setPdfLoading(false);
  };

  // 🖼️ Handle Gallery Upload
  const handleGalleryUpload = async (e: any) => {
    const files = e.target.files;
    if (!files.length) return;
    const toastId = toast.loading("Uploading gallery images...");
    try {
      setGalleryLoading(true);

      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        uploadedUrls.push(data.url);
      }

      setGalleryImages((prev) => [...prev, ...uploadedUrls]);
      toast.success("Gallery uploaded ✅", { id: toastId });
    } catch (error) {
      console.error("Error uploading gallery:", error);
      toast.error("Gallery upload failed ❌", { id: toastId });
    }
    setGalleryLoading(false);
  };

  // 🔥 UPDATE API CALL
  const handleUpdate = async () => {
    if (!form.name || !form.slug || !categoryId) {
      toast.error("Please fill required fields ❌");
      return;
    }

    const toastId = toast.loading("Updating product...");

    try {
      setUpdating(true);

      const relatedProductsArray =
        selectedRelated && selectedRelated.trim() ? [selectedRelated] : [];

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          slug: form.slug,
          description: form.description,
          shortDescription: form.shortDescription,
          brand: form.brand,
          sku: form.sku,
          productCode: form.productCode,
          categoryId,
          features: features.filter((f) => f?.trim()),
          specs: specs.filter((s) => s?.key && s?.value),
          techspecs: techspecs.filter((s) => s?.key && s?.value),
          diTerms: diTerms.split("|").filter((t) => t?.trim()),
          bannerImageUrl,
          images: galleryImages,
          relatedProducts: relatedProductsArray,
          content,
          pdfUrl: pdf,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product updated successfully 🎉", {
          id: toastId,
        });

        setTimeout(() => {
          router.push("/admin/Product");
        }, 800);
      } else {
        toast.error(data.error || "Update failed ❌", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌", {
        id: toastId,
      });
    } finally {
      setUpdating(false);
    }
  };

  // 🗑️ Remove image
  const removeImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p>Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Edit Product</h2>
          <Button
            className="cursor-pointer"
            onClick={handleUpdate}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Product"}
          </Button>
        </div>

        {/* 🔹 Basic Info */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Slug</label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Brand</label>
              <Input
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">SKU</label>
              <Input
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Product Code</label>
              <Input
                value={form.productCode}
                onChange={(e) =>
                  setForm({ ...form, productCode: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Short Description</label>
            <Textarea
              value={form.shortDescription}
              onChange={(e) =>
                setForm({ ...form, shortDescription: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* 🔹 Category & Related */}
        <div className="flex flex-col md:flex-row w-full gap-6">
          <div className="bg-white p-6 rounded-xl shadow space-y-4 w-full md:w-1/2">
            <h3 className="text-lg font-semibold">Category</h3>

            <Select
              value={categoryId}
              onValueChange={(val) => setCategoryId(val || "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                {categoriesList.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white p-6 rounded-xl shadow space-y-4 w-full md:w-1/2">
            <h3 className="text-lg font-semibold">Related Products</h3>

            <Select
              value={selectedRelated}
              onValueChange={(val) => setselectedRelated(val || "")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Related Product" />
              </SelectTrigger>

              <SelectContent>
                {relatedProductsList.map((prod) => (
                  <SelectItem key={prod.id} value={prod.id}>
                    {prod.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 🔹 Features */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Features</h3>

          {features.map((f, i) => (
            <div key={i}>
              <label className="text-sm">Feature {i + 1}</label>
              <Input
                value={f}
                onChange={(e) => {
                  const newF = [...features];
                  newF[i] = e.target.value;
                  setFeatures(newF);
                }}
              />
            </div>
          ))}

          <Button
            className="cursor-pointer"
            onClick={() => setFeatures([...features, ""])}
          >
            + Add Feature
          </Button>
        </div>

        {/* 🔹 Quick Specs */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Quick Specifications</h3>

          {specs.map((s, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Key</label>
                <Input
                  value={s.key}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[i].key = e.target.value;
                    setSpecs(newSpecs);
                  }}
                />
              </div>

              <div>
                <label className="text-sm">Value</label>
                <Input
                  value={s.value}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[i].value = e.target.value;
                    setSpecs(newSpecs);
                  }}
                />
              </div>
            </div>
          ))}

          <Button
            className="cursor-pointer"
            onClick={() => setSpecs([...specs, { key: "", value: "" }])}
          >
            + Add Spec
          </Button>
        </div>

        {/* 🔹 DI Terms */}
        <div className="bg-white p-6 rounded-xl shadow space-y-2">
          <label className="text-sm font-medium">DI Terms</label>
          <Input
            placeholder="SEP1|SEP2|SEP3"
            value={diTerms}
            onChange={(e) => setDiTerms(e.target.value)}
          />
        </div>

        {/* 🔹 Banner Image */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Banner Image</h3>

          <Input type="file" onChange={handleUpload} accept="image/*" />
          {loading_img && <p className="text-sm">Uploading...</p>}

          {bannerImageUrl && (
            <img
              src={bannerImageUrl}
              alt="Banner"
              className="w-40 h-40 rounded-lg border object-cover"
            />
          )}
        </div>

        {/* 🔹 PDF */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Technical Data Sheet</h3>

          <Input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
          />

          {pdfLoading && <p className="text-sm">Uploading...</p>}

          {pdf && (
            <a
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View PDF
            </a>
          )}
        </div>

        {/* 🔹 Gallery Images */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Gallery Images (Multiple)</h3>

          <Input
            type="file"
            multiple
            onChange={handleGalleryUpload}
            accept="image/*"
          />

          {galleryLoading && <p className="text-sm">Uploading...</p>}

          <div className="flex flex-wrap gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-24 h-24 rounded-lg border object-cover"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Technical Specs */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Technical Specifications</h3>

          {techspecs.map((s, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3">
              <Input
                placeholder="Key"
                value={s.key}
                onChange={(e) => {
                  const updated = [...techspecs];
                  updated[i].key = e.target.value;
                  setTechspecs(updated);
                }}
              />
              <Input
                placeholder="Value"
                value={s.value}
                onChange={(e) => {
                  const updated = [...techspecs];
                  updated[i].value = e.target.value;
                  setTechspecs(updated);
                }}
              />
            </div>
          ))}

          <Button
            className="cursor-pointer"
            onClick={() => setTechspecs([...techspecs, { key: "", value: "" }])}
          >
            + Add Tech Spec
          </Button>
        </div>

        {/* 🔹 Rich Content */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">Rich Content</h3>

          <Tabs defaultValue="description" className="space-y-4">
            <TabsList className="flex gap-2 border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>

            {Object.keys(content).map((key) => (
              <TabsContent key={key} value={key}>
                <RichEditor
                  value={content[key as keyof typeof content] || ""}
                  onChange={(val: string) =>
                    setContent({ ...content, [key]: val })
                  }
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* 🔹 Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/Product")}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={updating}>
            {updating ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
