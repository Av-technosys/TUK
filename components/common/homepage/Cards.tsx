"use client";

import React, { useEffect, useState } from "react";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconShieldCheck,
} from "@tabler/icons-react";

interface ContactBarData {
  headOffice: { title: string; line1: string; line2: string };
  salesEnquiries: { title: string; line1: string };
  email: { title: string; line1: string };
  certifications: { title: string; line1: string; line2: string };
}

const Cards = () => {
  const [contactBar, setContactBar] = useState<ContactBarData>({
    headOffice: {
      title: "Head Office",
      line1: "TUK Ltd, Wimbledon",
      line2: "London, SW19, UK",
    },
    salesEnquiries: {
      title: "Sales Enquiries",
      line1: "+44 (0)20 8946 6688",
    },
    email: {
      title: "Email",
      line1: "sales@tuk.co.uk",
    },
    certifications: {
      title: "Certifications",
      line1: "ISO 9001:2015",
      line2: "UKCA & CE Marked",
    },
  });

  useEffect(() => {
    fetch("/api/pages/home")
      .then((res) => res.json())
      .then((data) => {
        if (data.contactBar) setContactBar(data.contactBar);
      })
      .catch(console.error);
  }, []);

  const items = [
    {
      icon: IconMapPin,
      title: contactBar.headOffice.title,
      line1: contactBar.headOffice.line1,
      line2: contactBar.headOffice.line2,
    },
    {
      icon: IconPhone,
      title: contactBar.salesEnquiries.title,
      line1: contactBar.salesEnquiries.line1,
    },
    {
      icon: IconMail,
      title: contactBar.email.title,
      line1: contactBar.email.line1,
    },
    {
      icon: IconShieldCheck,
      title: contactBar.certifications.title,
      line1: contactBar.certifications.line1,
      line2: contactBar.certifications.line2,
    },
  ];

  return (
    /* OUTER WHITE SPACE */
    <section className="w-full bg-white py-6">
      {/* GRAY BAR */}
      <div className="w-full bg-[#F9FAFB]">
        {/* CONTENT WIDTH */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 xl:px-8 py-6">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex items-center gap-3 font-">
                  <div className="bg-[#1E3A8A] text-[#FB923C] rounded-xs p-2 flex items-center justify-center">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 font-barlow">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-600 font-inter">
                      {item.line1}
                    </p>

                    <p className="text-xs text-gray-500 font-inter">
                      {item.line2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
