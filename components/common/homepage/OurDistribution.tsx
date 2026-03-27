"use client";

import { useEffect, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const OurDistribution = () => {
  const [distributors, setDistributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const res = await fetch("/api/distributors");
        const data = await res.json();
        setDistributors(data);
      } catch (error) {
        console.error("Error fetching distributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  return (
    <section className="w-full bg-white font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-8 py-8">
        {/* Heading */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 border-t-2 border-[#FB923C] max-w-20" />

          <p className="text-[#FB923C] uppercase tracking-widest text-sm font-semibold">
            Authorised Distributors
          </p>

          <div className="flex-1 border-t-2 border-orange-500 max-w-20" />
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold text-black mt-4">
          Our Distribution Network
        </h2>

        <p className="text-center text-gray-500 mt-2">
          TUK products are available through our network of authorised trade
          distributors
        </p>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-6 text-gray-500">
            Loading distributors...
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-6 mt-8">
          {distributors.map((item: any) => (
            <div
              key={item.id}
              className="bg-[#F9FAFB] rounded-xl p-4 flex items-center justify-center hover:shadow-md transition"
            >
              <div className="relative w-full h-16">
                <Image
                  src={item.image || item.logo || "/image/img1.png"} // ✅ fallback
                  alt={item.name || "distributor"}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="text-[#1E3A8A] font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            Become an Authorised Distributor
            <IconChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurDistribution;
