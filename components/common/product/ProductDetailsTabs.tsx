"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductDetailsTabsProps {
  product?: {
    description?: string;
    Material?: string;
    Specification?: string;
    Packaging?: string;
    Additional?: string;
    content: any;
    specifications?: Array<{ key: string; value: string }>;
  };
}

export default function ProductDetailsTabs({
  product,
}: ProductDetailsTabsProps) {
  const description = product?.content?.description;
  const Material = product?.content?.Material;
  const Specification = product?.content?.Specification;
  const Packaging = product?.content?.Packaging;
  const Additional = product?.content?.Additional;
  const specifications = product?.specifications || [];

  const stripHtml = (html: string) => {
    if (typeof window === "undefined") return html; // SSR safety
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="w-full mt-10 flex flex-col gap-8">
      {/* Tabs */}

      <Tabs defaultValue="description" className="w-full font-poppins">
        <TabsList className="lg:flex grid grid-cols-5   flex-wrap lg:gap-3 bg-transparent justify-center mb-1 ">
          <TabsTrigger
            value="description"
            className="
      px-4 py-2 rounded-full border cursor-pointer
       text-[10px] font-semibold
      transition-all
 group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7]
    "
          >
            Description
          </TabsTrigger>

          <TabsTrigger
            value="Material"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full cursor-pointer text-[10px] font-semibold"
          >
            Material
          </TabsTrigger>

          <TabsTrigger
            value="Specification"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full cursor-pointer text-[10px] font-semibold"
          >
            Specification
          </TabsTrigger>

          <TabsTrigger
            value="Packaging"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full cursor-pointer text-[10px] font-semibold"
          >
            Packaging
          </TabsTrigger>

          <TabsTrigger
            value="Additional"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full cursor-pointer text-[10px] font-semibold"
          >
            Additional
          </TabsTrigger>
        </TabsList>

        {/* Description Tab */}

        <TabsContent value="description">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Product Description</h3>

            <p className="text-muted-foreground leading-relaxed">
              {stripHtml(description)}
            </p>
          </div>
        </TabsContent>

        {/* Usage */}

        <TabsContent value="Material">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Material</h3>
            <p className="text-muted-foreground"> {stripHtml(Material)}</p>
          </div>
        </TabsContent>

        {/* Benefits */}

        <TabsContent value="Specification">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Specification</h3>
            <p className="text-muted-foreground">{stripHtml(Specification)}</p>
          </div>
        </TabsContent>

        {/* Connectivity */}

        <TabsContent value="Packaging">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Packaging</h3>
            <p className="text-muted-foreground">{stripHtml(Packaging)}</p>
          </div>
        </TabsContent>

        {/* Safety */}

        <TabsContent value="Additional">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Additional</h3>
            <p className="text-muted-foreground">{stripHtml(Additional)}</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Technical Specification */}

      <div className="flex flex-col gap-4 font-inter">
        <h3 className="font-semibold text-lg">Technical Specification</h3>

        <div className="border rounded-xl overflow-hidden bg-white">
          {specifications.length > 0 ? (
            specifications.map((spec, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-2 p-4 ${idx !== specifications.length - 1 ? "border-b" : ""}`}
              >
                <span className="text-muted-foreground">{spec.key}</span>
                <span>{spec.value}</span>
              </div>
            ))
          ) : (
            <>
              <div className="grid grid-cols-2 border-b p-4">
                <span className="text-muted-foreground">Cable Type</span>
                <span>Cat6 UTP</span>
              </div>

              <div className="grid grid-cols-2 border-b p-4">
                <span className="text-muted-foreground">Conductor</span>
                <span>23AWG Solid Copper</span>
              </div>

              <div className="grid grid-cols-2 border-b p-4">
                <span className="text-muted-foreground">Frequency</span>
                <span>Up to 250MHz</span>
              </div>

              <div className="grid grid-cols-2 border-b p-4">
                <span className="text-muted-foreground">Length</span>
                <span>305m (1000ft)</span>
              </div>

              <div className="grid grid-cols-2 p-4">
                <span className="text-muted-foreground">Standards</span>
                <span>TIA/EIA-568-B.2</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
