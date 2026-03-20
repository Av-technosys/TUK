"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

export default function ProductDetailsTabs() {
  return (
    <div className="w-full mt-10 flex flex-col gap-8">

      {/* Tabs */}

      <Tabs defaultValue="description" className="w-full">

        <TabsList className="flex flex-wrap gap-3 bg-transparent justify-center">

          <TabsTrigger
    value="description"
    className="
      px-4 py-2 rounded-full border border-[#0300A7]
      text-[#0300A7] text-sm font-medium
      transition-all

      data-[state=active]:bg-[#0300A7]
      data-[state=active]:text-white
      data-[state=active]:border-[#0300A7]
    "
  >
    Description
  </TabsTrigger>

          <TabsTrigger value="usage" className="rounded-full">
            Usage
          </TabsTrigger>

          <TabsTrigger value="benefits" className="rounded-full">
            Benefits
          </TabsTrigger>

          <TabsTrigger value="connectivity" className="rounded-full">
            Connectivity
          </TabsTrigger>

          <TabsTrigger value="safety" className="rounded-full">
            Safety
          </TabsTrigger>

        </TabsList>


        {/* Description Tab */}

        <TabsContent value="description">

          <div className="border rounded-xl p-6 bg-white">

            <h3 className="font-semibold mb-4">
              Product Description
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

          </div>

        </TabsContent>


        {/* Usage */}

        <TabsContent value="usage">

          <div className="border rounded-xl p-6 bg-white">
            <p className="text-muted-foreground">
              Suitable for structured cabling systems, commercial networking,
              and high-speed Ethernet installations.
            </p>
          </div>

        </TabsContent>


        {/* Benefits */}

        <TabsContent value="benefits">

          <div className="border rounded-xl p-6 bg-white">
            <p className="text-muted-foreground">
              High signal stability, low interference, and reliable long-distance
              networking performance.
            </p>
          </div>

        </TabsContent>


        {/* Connectivity */}

        <TabsContent value="connectivity">

          <div className="border rounded-xl p-6 bg-white">
            <p className="text-muted-foreground">
              Supports Gigabit Ethernet and structured networking environments.
            </p>
          </div>

        </TabsContent>


        {/* Safety */}

        <TabsContent value="safety">

          <div className="border rounded-xl p-6 bg-white">
            <p className="text-muted-foreground">
              Manufactured following international safety and cabling standards.
            </p>
          </div>

        </TabsContent>

      </Tabs>



      {/* Technical Specification */}

      <div className="flex flex-col gap-4">

        <h3 className="font-semibold text-lg">
          Technical Specification
        </h3>

        <div className="border rounded-xl overflow-hidden bg-white">

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

          <div className="grid grid-cols-2 border-b p-4">
            <span className="text-muted-foreground">Color</span>
            <span>Blue</span>
          </div>

          <div className="grid grid-cols-2 border-b p-4">
            <span className="text-muted-foreground">Jacket Material</span>
            <span>PVC</span>
          </div>

          <div className="grid grid-cols-2 border-b p-4">
            <span className="text-muted-foreground">Temperature Range</span>
            <span>-20°C to +60°C</span>
          </div>

          <div className="grid grid-cols-2 border-b p-4">
            <span className="text-muted-foreground">Standards</span>
            <span>TIA/EIA-568-B.2</span>
          </div>

          <div className="grid grid-cols-2 p-4">
            <span className="text-muted-foreground">Packaging</span>
            <span>Pull Box</span>
          </div>

        </div>

      </div>

    </div>
  )
}