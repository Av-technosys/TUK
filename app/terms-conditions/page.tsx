"use client";

export default function TermsConditionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Terms and Conditions
      </h1>

      {/* UK SALES */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Sales to UK Customers
        </h2>

        <p>
          Free three day delivery on UK mainland. Additional charges apply for
          highlands, islands, offshore UK and export. Next working day delivery
          upgrade attracts a £7.00 charge.
        </p>

        <p className="mt-2">
          Orders received by 2:45 pm are generally processed the same day unless
          delayed dispatch is requested.
        </p>

        <h3 className="font-semibold mt-4">Small Orders</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>£10 charge for orders below £50</li>
          <li>
            £13 handling charge for consignments under £250 (excluding VAT)
          </li>
        </ul>

        <ul className="list-disc pl-6 mt-4 space-y-1">
          <li>All products are subject to availability</li>
          <li>
            Delivery discrepancies must be reported within 5 working days or 48
            hours after delivery
          </li>
          <li>
            Products carry a 12-month guarantee (repair, replace or refund)
          </li>
          <li>
            Liability is limited to the value of goods supplied. No liability
            for consequential loss
          </li>
          <li>Prices exclude VAT and may change without notice</li>
          <li>Goods remain property of TUK Ltd until fully paid</li>
          <li>
            Instalment deliveries may be invoiced separately and must be paid
            individually
          </li>
        </ul>

        <h3 className="font-semibold mt-4">Payment Methods</h3>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Cheque (cleared/guaranteed)</li>
          <li>Cash (up to £100)</li>
          <li>Debit card (up to £1000 + VAT)</li>
          <li>Bank transfer</li>
        </ul>

        <p className="mt-3">
          Environmental policy: Goods may be delivered in recycled packaging.
        </p>

        <p className="mt-2">
          All sales are subject to English law and disputes are resolved in
          London courts.
        </p>
      </section>

      {/* OVERSEAS SALES */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Sales to Overseas Customers
        </h2>

        <ul className="list-disc pl-6 space-y-1">
          <li>Prices quoted are EXW (Incoterms 2010)</li>
          <li>Netherlands & Ireland: DDP (Incoterms 2020)</li>
          <li>Minimum order value: £100</li>
          <li>All goods subject to availability</li>
          <li>Payment required before dispatch unless account exists</li>
          <li>
            Delivery discrepancies must be reported within 7 working days or 48
            hours after delivery
          </li>
          <li>12-month product guarantee</li>
          <li>Prices valid for 30 days</li>
          <li>Goods remain property until fully paid</li>
        </ul>

        <p className="mt-3">
          Orders are processed after written confirmation and payment
          arrangements.
        </p>

        <p className="mt-2">
          Customers must comply with legal requirements in their own country.
        </p>
      </section>

      {/* CREDIT ACCOUNTS */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-black">
          Terms for Credit Accounts
        </h2>

        <ul className="list-disc pl-6 space-y-1">
          <li>
            Applicants must provide business details and 2 trade references
          </li>
          <li>Payment terms are strictly 30 days</li>
          <li>Late payments may result in account suspension without notice</li>
          <li>Deliveries may be delayed if payments are overdue</li>
          <li>Interest of 1.5% per month may be charged on overdue amounts</li>
          <li>
            TUK Ltd may offset any owed amounts against outstanding balances
          </li>
        </ul>
      </section>

      {/* GENERAL */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-black">General Terms</h2>

        <ul className="list-disc pl-6 space-y-1">
          <li>
            Product descriptions are approximate and may change without notice
          </li>
          <li>
            Intellectual property rights are protected; copying requires written
            consent
          </li>
          <li>
            TUK Ltd may retain customer information for at least 2 years after
            last interaction
          </li>
          <li>
            Terms are updated periodically. Latest version available on official
            website
          </li>
        </ul>

        <p className="mt-4 text-sm text-gray-500">
          Last updated: November 2025
        </p>
      </section>
    </div>
  );
}
