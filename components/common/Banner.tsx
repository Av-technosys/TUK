"use client"

import Image from "next/image"
import React, { useState } from "react"

import { Button } from "@/components/ui/button"

import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel"

const slides = [
{
img: "/banner 3.png",
title: (
<>
Download <span className="text-orange-500">Product</span><br />Guide
</>
),
desc:
"Access detailed specifications, features, and complete information about our connectivity and cabling solutions.",
btn: "Download product guide →",
},
{
img: "/banner 2.png",
title: (
<>
WORLD CLASS DESIGNER AND<br />MANUFACTURER
</>
),
desc:
"World-class designer and manufacturer of reliable copper cabling solutions for advanced and efficient connectivity infrastructure.",
btn: "Browse All Products →",
},
{
img: "/banner 3.png",
title: (
<>
Explore our wide range of <span className="text-red-500">SPEEDY</span> RJ45 plugs and tools
</>
),
desc:
"Since 1984, TUK has been the trusted B2B partner for voice and data copper cabling.",
btn: "Browse SPEEDY RJ45 →",
},
]

const Banner = () => {

const [active,setActive] = useState(0)

return (

<section className="w-full relative overflow-hidden">

<Carousel
className="w-full relative"
opts={{ loop: true }}
>

<CarouselContent>

{slides.map((slide, index) => (

<CarouselItem key={index}>

<div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh]">

<Image
src={slide.img}
alt="banner"
fill
priority
className="object-cover"
/>

<div className="absolute inset-0 bg-black/60" />

<div className="absolute inset-0 flex items-center justify-center text-center">

<div className="max-w-3xl text-white px-6">

<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
{slide.title}
</h1>

<p className="mt-4 text-base sm:text-lg text-gray-200">
{slide.desc}
</p>

<div className="mt-6">

<Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-base rounded-full">
{slide.btn}
</Button>

</div>

</div>

</div>

</div>

</CarouselItem>

))}

</CarouselContent>

<CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />

<CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />

</Carousel>

{/* DOTS */}

<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">

{slides.map((_,index)=>(

<div
key={index}
className="w-3 h-3 rounded-full bg-white/50"
/>

))}

</div>

</section>

)
}

export default Banner