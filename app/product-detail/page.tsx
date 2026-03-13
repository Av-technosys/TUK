import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

import ProductGallery from "@/components/common/product/product-gallery"
import ProductInfo from "@/components/common/product/product-info"
import TechnicalDataSheet from "@/components/common/product/TechnicalDataSheet"
import ProductDetailsTabs from "@/components/common/product/ProductDetailsTabs"


export default function Page() {
  return (
    <>
      <Header />

      <section className="w-full bg-muted/30">
        <div className="container mx-auto px-4 py-10">

          {/* Top Product Section */}

          <div className="grid lg:grid-cols-2 gap-10">

            <ProductGallery />

            <ProductInfo />

          </div>


          {/* Technical Data Sheet Section */}

          <div className="mt-10">

            <TechnicalDataSheet />
            <ProductDetailsTabs />

          </div>

        </div>
      </section>

      <Footer />
    </>
  )
}