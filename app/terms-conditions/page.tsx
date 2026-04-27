"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Section {
  id: string;
  title: string;
  content: string[];
  subsections?: Array<{
    subtitle: string;
    content: string;
  }>;
}

interface TermsPageData {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  sections: Section[];
}

export default function TermsConditionsPage() {
  const [data, setData] = useState<TermsPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTermsPage = async () => {
      try {
        const response = await fetch("/api/pages/terms-conditions");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch terms page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTermsPage();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Failed to load terms page</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      {/* 🔵 HERO */}
      <div className="bg-gradient-to-r from-[#141D3D] to-[#364FA3] text-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center">{data.title}</h1>
          <p className="mt-2 text-sm opacity-90 text-center">{data.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 📌 SIDEBAR */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3 text-gray-800">Contents</h3>
            <ul className="space-y-2 text-sm">
              {data.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-gray-600 hover:text-blue-700 transition"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 📄 CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {data.sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                {section.title}
              </h2>

              {/* Main Content */}
              {section.content.map((item, index) => (
                <p key={index} className="mb-2 text-gray-700">
                  {item}
                </p>
              ))}

              {/* Subsections */}
              {section.subsections && (
                <div className="mt-4 space-y-3">
                  {section.subsections.map((subsection, index) => (
                    <div key={index}>
                      <h3 className="font-semibold mt-3 text-gray-800">
                        {subsection.subtitle}
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line text-sm">
                        {subsection.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
