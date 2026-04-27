"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Section {
  title: string;
  content?: string;
  subsections?: Array<{
    subtitle: string;
    content: string;
  }>;
}

interface PrivacyPolicyData {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  sections: Section[];
}

export default function PrivacyPolicyPage() {
  const [data, setData] = useState<PrivacyPolicyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/pages/privacy-policy");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError("Failed to load privacy policy");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">
          {error || "Failed to load privacy policy"}
        </p>
      </div>
    );
  }

  const sections = data.sections.map((section, index) => ({
    id: `section-${index}`,
    label: section.title,
  }));

  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      {/* 🔵 HERO SECTION */}
      <div className="bg-linear-to-r from-[#141D3D] to-[#364FA3] text-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl text-center font-bold">{data.title}</h1>
          <p className="mt-2 text-sm opacity-90 text-center">{data.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 📌 SIDEBAR */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3 text-gray-800">Contents</h3>
            <ul className="space-y-2 text-sm">
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-600 hover:text-blue-700 transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 📄 MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {data.sections.map((section, index) => (
            <div
              key={index}
              id={`section-${index}`}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-900 font-poppins">
                {section.title}
              </h2>

              {/* Regular Content */}
              {section.content && !section.subsections && (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {section.content}
                </p>
              )}

              {/* Subsections */}
              {section.subsections && (
                <div className="space-y-3">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {subsection.subtitle}
                      </h3>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">
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
