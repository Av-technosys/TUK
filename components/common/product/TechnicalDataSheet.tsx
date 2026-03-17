import { Button } from "@/components/ui/button"
import { IconFileTypePdf, IconDownload } from "@tabler/icons-react"

export default function TechnicalDataSheet() {
  return (
    <div className="w-full border rounded-xl bg-white flex items-center justify-between gap-6 p-6 flex-wrap">

      {/* Left Section */}

      <div className="flex items-center gap-4">

        <div className="bg-[#eb3e3e] text-white rounded-xl p-4 flex items-center justify-center">
          <IconFileTypePdf size={26} />
        </div>

        <div className="flex flex-col">

          <h3 className="font-semibold text-xl">
            Technical Data Sheet
          </h3>

          <p className="text-muted-foreground text-sm">
            Complete specifications, installation guide, and compliance certificate
          </p>

        </div>

      </div>


      {/* Download Button */}

      <Button className="rounded-full flex items-center gap-2">
        <IconDownload size={18} />
        Download PDF
      </Button>

    </div>
  )
}