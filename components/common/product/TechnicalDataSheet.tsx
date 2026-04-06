"use client";

import { Button } from "@/components/ui/button";
import { IconFileTypePdf, IconDownload } from "@tabler/icons-react";

interface TechnicalDataSheetProps {
  product?: {
    pdfUrl?: string;
    name?: string;
  };
}

export default function TechnicalDataSheet({
  product,
}: TechnicalDataSheetProps) {
  const pdfUrl = product?.pdfUrl;

  return (
    <div className="w-full border rounded-xl bg-white flex items-center justify-between gap-6 p-6 flex-wrap">
      {/* Left Section */}

      <div className="flex items-center gap-4">
        <div className="bg-[#eb3e3e] text-white rounded-xl p-4 flex items-center justify-center">
          <IconFileTypePdf size={26} />
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold text-xl font-poppins">
            Technical Data Sheet
          </h3>

          <p className="text-muted-foreground text-sm font-inter">
            Complete specifications, installation guide, and compliance
            certificate
          </p>
        </div>
      </div>

      {/* Download Button */}

      <Button
        className="rounded-full flex items-center gap-2 font-inter cursor-pointer"
        disabled={!pdfUrl}
        onClick={() => pdfUrl && window.open(pdfUrl, "_blank")}
      >
        <IconDownload size={18} />
        Download PDF
      </Button>
    </div>
  );
}
