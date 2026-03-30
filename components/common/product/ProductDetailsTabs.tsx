"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductDetailsTabsProps {
  product?: {
    description?: string;
    usage?: string;
    benefits?: string;
    connectivity?: string;
    safety?: string;
    content: any;
    specifications?: Array<{ key: string; value: string }>;
  };
}

export default function ProductDetailsTabs({
  product,
}: ProductDetailsTabsProps) {
  const description = product?.content?.description;
  const usage = product?.content?.usage;
  const benefits = product?.content?.benefits;
  const connectivity = product?.content?.connectivity;
  const safety = product?.content?.safety;
  const specifications = product?.specifications || [];

  const stripHtml = (html: string) => {
    if (typeof window === "undefined") return html; // SSR safety
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="w-full mt-10 flex flex-col gap-8">
      {/* Tabs */}

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="flex flex-wrap gap-3 bg-transparent justify-center">
          <TabsTrigger
            value="description"
            className="
      px-4 py-2 rounded-full border 
       text-sm font-medium
      transition-all
 group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7]
    "
          >
            Description
          </TabsTrigger>

          <TabsTrigger
            value="usage"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full"
          >
            Usage
          </TabsTrigger>

          <TabsTrigger
            value="benefits"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full"
          >
            Benefits
          </TabsTrigger>

          <TabsTrigger
            value="connectivity"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full"
          >
            Connectivity
          </TabsTrigger>

          <TabsTrigger
            value="safety"
            className="  group-data-[variant=default]/tabs-list:data-active:bg-[#0300A7] group-data-[variant=default]/tabs-list:data-active:text-white group-data-[variant=default]/tabs-list:data-active:border-[#0300A7] rounded-full"
          >
            Safety
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

        <TabsContent value="usage">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Usage</h3>
            <p className="text-muted-foreground"> {stripHtml(usage)}</p>
          </div>
        </TabsContent>

        {/* Benefits */}

        <TabsContent value="benefits">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Benefits</h3>
            <p className="text-muted-foreground">{stripHtml(benefits)}</p>
          </div>
        </TabsContent>

        {/* Connectivity */}

        <TabsContent value="connectivity">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Connectivity</h3>
            <p className="text-muted-foreground">{stripHtml(connectivity)}</p>
          </div>
        </TabsContent>

        {/* Safety */}

        <TabsContent value="safety">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-4">Safety</h3>
            <p className="text-muted-foreground">{stripHtml(safety)}</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Technical Specification */}

      <div className="flex flex-col gap-4">
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
