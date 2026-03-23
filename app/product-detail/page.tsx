import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import ProductGallery from "@/components/common/product/product-gallery"
import ProductInfo from "@/components/common/product/product-info"
import TechnicalDataSheet from "@/components/common/product/TechnicalDataSheet"
import ProductDetailsTabs from "@/components/common/product/ProductDetailsTabs"
import RelatedProducts from "@/components/common/Related Products"

import Link from "next/link"

export default function Page() {
  return (
    <>
      <Header />

      {/* ✅ Breadcrumb Start */}
      <div className="w-full bg-gray-50 ">
        <div className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex flex-wrap items-center gap-2">

          <Link href="/" className="hover:text-foreground transition">
            Home
          </Link>

          <span>›</span>

          <Link href="/product" className="hover:text-foreground transition">
            Product
          </Link>

          <span>›</span>

          <Link href="/category" className="hover:text-foreground transition">
            Category
          </Link>

          <span>›</span>

          <span className="text-foreground font-medium">
            Cat6 UTP Cable
          </span>

        </div>
      </div>
      {/* ✅ Breadcrumb End */}

      <section className="w-full bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Top Product Section */}
          <div className="grid lg:grid-cols-2 gap-10">
            <ProductGallery />
            <ProductInfo />
             <div data-di-terms="SEPZ1yw|SEPZ2yw|SEPZ3yw|SEPZ5yw"></div>
          </div>

          {/* Technical Data Sheet Section */}
          <div className="mt-10">
            <TechnicalDataSheet />
           
            <ProductDetailsTabs />
            <RelatedProducts />
          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}