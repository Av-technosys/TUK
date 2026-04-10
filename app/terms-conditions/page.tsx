"use client";

const sections = [
  { id: "uk", label: "UK Sales" },
  { id: "overseas", label: "Overseas Sales" },
  { id: "credit", label: "Credit Accounts" },
  { id: "general", label: "General Terms" },
];

export default function TermsConditionsPage() {
  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      {/* 🔵 HERO */}
      <div className="bg-gradient-to-r from-[#141D3D] to-[#364FA3] text-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center">Terms & Conditions</h1>
          <p className="mt-2 text-sm opacity-90 text-center">
            Please read these terms carefully before using our services.
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

        {/* 📄 CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {/* UK SALES */}
          <div
            id="uk"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Sales to UK Customers
            </h2>

            <p>
              Free three day delivery on UK mainland. Additional charges apply
              for highlands, islands and export. Next working day delivery
              upgrade costs £7.
            </p>

            <p className="mt-2">
              Orders before 2:45 pm are processed same day unless delayed
              dispatch requested.
            </p>

            <h3 className="font-semibold mt-4">Small Orders</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>£10 charge for orders under £50</li>
              <li>£13 handling charge under £250 (excluding VAT)</li>
            </ul>

            <ul className="list-disc pl-6 mt-4 space-y-1">
              <li>Products subject to availability</li>
              <li>Report delivery issues within 5 days / 48 hours</li>
              <li>12-month warranty (repair / replace / refund)</li>
              <li>No liability beyond product value</li>
              <li>Prices exclude VAT</li>
              <li>Ownership retained until payment</li>
            </ul>
          </div>

          {/* OVERSEAS */}
          <div
            id="overseas"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Sales to Overseas Customers
            </h2>

            <ul className="list-disc pl-6 space-y-1">
              <li>Prices EXW (Incoterms 2010)</li>
              <li>Netherlands & Ireland: DDP</li>
              <li>Minimum order £100</li>
              <li>Prepayment required</li>
              <li>Delivery issues within 7 days / 48 hours</li>
              <li>12-month warranty</li>
              <li>Prices valid 30 days</li>
            </ul>

            <p className="mt-3">
              Orders dispatched after confirmation and payment setup.
            </p>
          </div>

          {/* CREDIT */}
          <div
            id="credit"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Credit Accounts
            </h2>

            <ul className="list-disc pl-6 space-y-1">
              <li>2 trade references required</li>
              <li>Strict 30-day payment terms</li>
              <li>Late payments may suspend account</li>
              <li>Deliveries may stop if overdue</li>
              <li>1.5% monthly interest on overdue</li>
              <li>Outstanding balances may be offset</li>
            </ul>
          </div>

          {/* GENERAL */}
          <div
            id="general"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              General Terms
            </h2>

            <ul className="list-disc pl-6 space-y-1">
              <li>Product descriptions may vary</li>
              <li>IP rights protected</li>
              <li>Customer data retained (min 2 years)</li>
              <li>Terms updated periodically</li>
            </ul>

            <p className="mt-4 text-sm text-gray-500">
              Last updated: November 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
