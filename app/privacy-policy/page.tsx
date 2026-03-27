"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-black">Privacy Policy</h1>

      {/* WHO WE ARE */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">Who We Are</h2>
        <p>
          TUK Ltd produces and supplies cabling systems and connectivity. This
          policy relates to all such activities including those of any group
          companies.
        </p>
      </section>

      {/* TYPES OF DATA WE PROCESS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Types of Data We Process
        </h2>

        <h3 className="font-semibold mt-3">General</h3>
        <p>
          We hold data about our employees, our customers and suppliers. We hold
          the minimum necessary information for the shortest reasonable time. We
          do not pass such information onto 3rd parties unless we are obliged
          to. Such information is held on the grounds of legal obligation under
          contract or due to our legitimate interest in holding the data to
          fulfil legal or contractual obligations as an employer, supplier or
          customer.
        </p>

        <h3 className="font-semibold mt-3">Cookies</h3>
        <p>
          Where possible we minimise the use of cookies on our websites. They
          are used to facilitate use of the website but we do not use them for
          marketing.
        </p>

        <h3 className="font-semibold mt-3">Website Analytics</h3>
        <p>
          We use website analytics in anonymised form to learn how to improve
          the performance of our websites.
        </p>

        <h3 className="font-semibold mt-3">Mailing Lists</h3>
        <p>
          We collect personal information about customers and prospective
          customers who have shown an interest in our products or services. We
          use that information to tell you about new and existing products and
          services.
        </p>
        <p className="mt-2">
          We don’t rent or trade email lists with other organisations and
          businesses. Our email ‘shots’ are sent by us rather than by a third
          party.
        </p>
        <p className="mt-2">
          Anyone receiving an unwanted promotional email can be removed from our
          mailing list, although we shall continue to hold necessary data if
          they remain a customer.
        </p>

        <h3 className="font-semibold mt-3">Publicly Available Information</h3>
        <p>
          If we hold personal information that is readily available in the
          public domain, we exercise the right not to delete it unless or until
          we are satisfied it is no longer useful, unless asked to do so by the
          data subject.
        </p>
      </section>

      {/* HOW WE USE DATA */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          How We Use Data
        </h2>
        <p>
          When you deal with TUK as a customer or supplier or employee, your
          name, company (if applicable), address data, email and contact
          telephone number will be stored by us, securely and for the minimum
          amount of time.
        </p>

        <p className="mt-2">
          TUK reviews our customer database on a regular basis and contacts
          customers every 2 years to confirm that they are happy to continue
          receiving emails relating to special offers and products.
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-1">
          <li>To provide goods and services</li>
          <li>To provide relevant and useful information/promotions</li>
          <li>To manage any registered account(s) held with us</li>
          <li>To verify identity</li>
          <li>
            For crime and fraud prevention, detection and related purposes
          </li>
          <li>For market research purposes</li>
          <li>To manage customer service interactions</li>
          <li>
            Where we have a legal right or duty to use or disclose your
            information
          </li>
        </ul>
      </section>

      {/* ACCESS */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Access to Your Personal Information
        </h2>
        <p>
          Under GDPR, you are entitled to view, amend, and potentially delete
          the personal information that we hold. An access request may be
          subject to a fee of £10 to cover administrative costs.
        </p>
      </section>

      {/* RESPONSIBLE PERSON */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-black">
          The Person Responsible for Data Handling
        </h2>
        <p>
          Our Managing Director Stephen Mercer takes responsibility for data
          handling. He can be contacted at our head office.
        </p>
      </section>

      {/* CHANGES */}
      <section>
        <h2 className="text-xl font-semibold mb-2 text-black">
          Changes to This Privacy Notice
        </h2>
        <p>This policy was last updated on 24th May 2018.</p>
      </section>
    </div>
  );
}
