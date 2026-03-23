"use client";

import { useState,useEffect  } from "react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import RichEditor from "@/components/common/RichEditor";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    brand: "",
    sku: "",
    productCode: "",
    // categoryId: "",
    // selectedRelated: "",
    
  });
  const [content, setContent] = useState({
  description: "",
  usage: "",
  benefits: "",
  connectivity: "",
  safety: "",
});

  const [features, setFeatures] = useState<string[]>([""]);
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [techspecs, setTechspecs] = useState([{ key: "", value: "" }]);
  const [diTerms, setDiTerms] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
const [categoryId, setCategoryId] = useState<string>("");
 const [relatedProductsList, setRelatedProductsList] = useState<any[]>([]);
const [selectedRelated, setselectedRelated] = useState<string>("");
const [pdf, setPdf] = useState<string>("");
const [pdfLoading, setPdfLoading] = useState(false);
const [galleryImages, setGalleryImages] = useState<string[]>([]);
const [galleryLoading, setGalleryLoading] = useState(false);


const handlePdfUpload = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  // ✅ allow only PDF
  if (file.type !== "application/pdf") {
    alert("Only PDF allowed");
    return;
  }

  setPdfLoading(true);

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  setPdf(data.url);
  setPdfLoading(false);
};
  // ✅ Image Upload Handler (merged)
  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setImages((prev) => [...prev, data.url]);
    setLoading(false);
  };

  const handleGalleryUpload = async (e: any) => {
  const files = e.target.files;
  if (!files.length) return;

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
  setGalleryLoading(false);
};

  useEffect(() => {
  const fetchCategories = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategoriesList(data);
    setRelatedProductsList(data);
  };

  fetchCategories();
}, []);

  // 🧠 Handle Submit
  const handleSubmit = async () => {
  const res = await fetch("/api/products/add-products", {
    method: "POST",
    body: JSON.stringify({
      name: form.name,
      slug: form.slug,
      description: form.description,
      shortDescription: form.shortDescription,
      brand: form.brand,
      sku: form.sku,
      productCode: form.productCode,

      categoryId, // ✅ correct
      relatedProducts: selectedRelated, // ✅ correct

      features,
      specs,
      techspecs,
      diTerms: diTerms.split("|"),
      bannerImageUrl: images[0] || "",
       images: galleryImages, // ✅ multiple images
      content,
      pdfUrl: pdf,
    }),
  });

  const data = await res.json();
  console.log(data);
};


  return (
<div className="p-4 md:p-8 bg-gray-50 min-h-screen">
  <div className="max-w-6xl mx-auto space-y-6">

    {/* Header */}
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Add Product</h2>
      <Button onClick={handleSubmit}>Save Product</Button>
    </div>

    {/* 🔹 Basic Info */}
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="text-sm font-medium">Product Name</label>
          <Input onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">Slug</label>
          <Input onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">Brand</label>
          <Input onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">SKU</label>
          <Input onChange={(e) => setForm({ ...form, sku: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">Product Code</label>
          <Input onChange={(e) => setForm({ ...form, productCode: e.target.value })} />
        </div>

        

      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
    </div>

    {/* 🔹 Category */}
    <div className="flex w-full gap-6">
<div className="bg-white p-6 rounded-xl shadow space-y-4 w-full md:w-1/2">
      <h3 className="text-lg font-semibold">Category</h3>

      <Select onValueChange={(value) => setCategoryId(value as string)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>

        <SelectContent>
          {categoriesList.map((cat) => (
            <SelectItem key={cat.id} value={String(cat.id)}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="bg-white p-6 rounded-xl shadow space-y-4 w-full md:w-1/2">
      <h3 className="text-lg font-semibold">Related Products</h3>

      <Select onValueChange={(value) => setselectedRelated(value as string)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Related Product" />
        </SelectTrigger>

        <SelectContent>
          {relatedProductsList.map((cat) => (
            <SelectItem key={cat.id} value={String(cat.id)}>
              {cat.name}
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

      <Button onClick={() => setFeatures([...features, ""])}>+ Add Feature</Button>
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

      <Button onClick={() => setSpecs([...specs, { key: "", value: "" }])}>
        + Add Spec
      </Button>
    </div>

    {/* 🔹 DI Terms */}
    <div className="bg-white p-6 rounded-xl shadow space-y-2">
      <label className="text-sm font-medium">DI Terms</label>
      <Input
        placeholder="SEP1|SEP2|SEP3"
        onChange={(e) => setDiTerms(e.target.value)}
      />
    </div>

    {/* 🔹 Images */}
    <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white p-6 rounded-xl shadow space-y-4 w-full md:w-1/2">
      <h3 className="text-lg font-semibold">Images</h3>

      <Input type="file" onChange={handleUpload} />
      {loading && <p className="text-sm">Uploading...</p>}

      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <img key={i} src={img} className="w-24 h-24 rounded-lg border object-cover" />
        ))}
      </div>
    </div>
    {/* 🔹 PDF */}
    <div className="bg-white p-6 rounded-xl shadow space-y-2 w-full md:w-1/2">
      <h3 className="text-lg font-semibold">Technical Data Sheet</h3>

      <Input type="file" accept="application/pdf" onChange={handlePdfUpload} />

      {pdfLoading && <p className="text-sm">Uploading...</p>}

      {pdf && (
        <a href={pdf} target="_blank" className="text-blue-600 underline text-sm">
          View Uploaded PDF
        </a>
      )}
    </div>
    </div>

    {/* 🔹 Gallery Images (Multiple) */}
<div className="bg-white p-6 rounded-xl shadow space-y-4">
  <h3 className="text-lg font-semibold">Gallery Images (Multiple)</h3>

  <Input type="file" multiple onChange={handleGalleryUpload} />

  {galleryLoading && <p className="text-sm">Uploading...</p>}

  <div className="flex flex-wrap gap-3">
    {galleryImages.map((img, i) => (
      <img
        key={i}
        src={img}
        className="w-24 h-24 rounded-lg border object-cover"
      />
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

      <Button onClick={() => setTechspecs([...techspecs, { key: "", value: "" }])}>
        + Add Spec
      </Button>
    </div>

    {/* 🔹 Related Products */}
    

    {/* 🔹 Rich Content */}
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold">Product Content</h3>

      <Tabs defaultValue="description">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        {Object.keys(content).map((key) => (
          <TabsContent key={key} value={key}>
            <RichEditor
              value={content[key as keyof typeof content]}
              onChange={(val: string) =>
                setContent({ ...content, [key]: val })
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>

    

  </div>
</div>
  );
}