"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { link } from "fs";

const slides = [
  {
    img: "/banner 3.png",
    title: (
      <>
        Download <span className="text-[#F97316]">Product</span>
        <br />
        Guide
      </>
    ),
    desc: "Access detailed specifications, features, and complete information about our connectivity and cabling solutions.",
    btn: "Download product guide →",
    link: "#product-guide",
  },
  {
    img: "/banner 2.png",
    title: (
      <>
        WORLD CLASS DESIGNER AND
        <br />
        MANUFACTURER
      </>
    ),
    desc: "World-class designer and manufacturer of reliable copper cabling solutions for advanced and efficient connectivity infrastructure.",
    btn: "Browse All Products →",
    link: "/products",
  },
  {
    img: "/banner 3.png",
    title: (
      <>
        Explore our wide range of <span className="text-[#FF0000]">SPEEDY</span>{" "}
        RJ45 plugs and tools
      </>
    ),
    desc: "Since 1984, TUK has been the trusted B2B partner for voice and data copper cabling — supplying manufacturers, wholesalers and distributors across 10+ countries.",
    btn: "Browse SPEEDY RJ45 →",
    link: "/category",
  },
];

const Banner = () => {
  const [api, setApi] = useState<any>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;

    setActive(api.selectedScrollSnap());

    api.on("select", () => {
      setActive(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full relative overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full relative"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[80vh]">
                <Image
                  src={slide.img}
                  alt="banner"
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-3xl text-white px-6">
                    <h1 className="text-4xl md:text-6xl font-bold font-barlow leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-4 text-lg font-inter text-gray-200">
                      {slide.desc}
                    </p>

                    <div className="mt-6">
                      <Link href={slide.link}>
                        <Button className="cursor-pointer bg-[#F97316] font-inter font-bold px-4 py-6  text-white rounded-full">
                          {slide.btn}
                        </Button>
                      </Link>
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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition ${
              active === index ? "bg-[#F97316]" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
