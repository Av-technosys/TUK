"use client";

import { useState } from "react";

const sections = [
  { id: "who", label: "Who We Are" },
  { id: "data", label: "Data We Process" },
  { id: "usage", label: "How We Use Data" },
  { id: "access", label: "Access Rights" },
  { id: "responsible", label: "Responsible Person" },
  { id: "changes", label: "Updates" },
];

export default function PrivacyPolicyPage() {
  const [active, setActive] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 🔵 HERO SECTION */}
      <div className="bg-gradient-to-r  from-[#141D3D] to-[#364FA3] text-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl text-center font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm opacity-90 text-center">
            Your data privacy and protection is important to us.
          </p>
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
          {/* CARD */}
          <div
            id="who"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Who We Are
            </h2>
            <p>
              TUK Ltd produces and supplies cabling systems and connectivity.
              This policy relates to all such activities including those of any
              group companies.
            </p>
          </div>

          <div
            id="data"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Types of Data We Process
            </h2>

            <h3 className="font-semibold mt-2">General</h3>
            <p>
              We hold data about employees, customers and suppliers. We store
              only necessary information and do not share with third parties
              unless required.
            </p>

            <h3 className="font-semibold mt-3">Cookies</h3>
            <p>We minimise cookies and do not use them for marketing.</p>

            <h3 className="font-semibold mt-3">Website Analytics</h3>
            <p>We use anonymised analytics to improve performance.</p>

            <h3 className="font-semibold mt-3">Mailing Lists</h3>
            <p>
              We use collected data to inform customers about products. No data
              selling.
            </p>

            <h3 className="font-semibold mt-3">Public Information</h3>
            <p>
              Public domain data may be retained unless requested otherwise.
            </p>
          </div>

          <div
            id="usage"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              How We Use Data
            </h2>

            <ul className="list-disc pl-6 space-y-1">
              <li>Provide goods and services</li>
              <li>Promotions and updates</li>
              <li>Manage accounts</li>
              <li>Verify identity</li>
              <li>Fraud prevention</li>
              <li>Market research</li>
              <li>Customer service</li>
              <li>Legal compliance</li>
            </ul>
          </div>

          <div
            id="access"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Access to Your Personal Information
            </h2>
            <p>
              You can request access, modification or deletion of your data
              under GDPR.
            </p>
          </div>

          <div
            id="responsible"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Responsible Person
            </h2>
            <p>
              Managing Director Stephen Mercer is responsible for data handling.
            </p>
          </div>

          <div
            id="changes"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Policy Updates
            </h2>
            <p className="text-sm text-gray-500">Last updated: 24 May 2018</p>
          </div>
        </div>
      </div>
    </div>
  );
}
