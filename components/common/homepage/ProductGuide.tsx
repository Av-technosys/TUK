"use client"

import { Button } from "@base-ui/react"
import Image from "next/image"

const ProductGuide = () => {
  return (
    <section className=" relative w-full max-w-6xl mx-auto  text-white "> 
    <div className="flex w-full border-2  bg-[#141D3D]
     rounded-xl gap-12 justify-center">
      <div className="">
<Image
             src="/image/Guide.png"
             alt="Product Guide"
             width={300}
             height={600}
             className="  object-cover"
             priority
           />
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4 mt-10 font-poppins ">Get the 2024 Product Guide</h2>
        <p className="text-md mb-6 font-poppins">Detailed specifications, installation diagrams, and the full SPEEDY RJ45 range. Direct to your inbox.</p>
     <form className="grid grid-cols-2 gap-4 text-[#6B7280] font-inter ">
          <input type="email" placeholder="Enter your email" className="bg-white/5 rounded-md p-2 w-full" required />
        <input type="email" placeholder="Enter your email" className="bg-white/5  rounded-md p-2 w-full" required />
          <input type="email" placeholder="Enter your email" className="bg-white/5 rounded-md p-2 w-full" required />
        <input type="email" placeholder="Enter your email" className="bg-white/5 rounded-md p-2 w-full" required />
          <input type="email" placeholder="Enter your email" className="bg-white/5 rounded-md p-2 w-full" required />
            <input type="email" placeholder="Enter your email" className="bg-white/5 rounded-md p-2 w-full" required />
        <input type="email" placeholder="Enter your email" className="bg-white/5 rounded-md p-2 w-full" required />
          <Button type="submit" className="bg-[#0300A7]  text-white rounded-md px-4 py-2 w-full">Send PDF Guide</Button>
      </form>
      <p className="text-sm text-gray-500 mt-4 font-inter">By clicking you agree to our privacy policy and receiving B2B updates.</p>
      </div>
      
      </div>  
    
    </section>
  )
}

export default ProductGuide


