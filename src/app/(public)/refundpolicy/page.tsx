export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-16">
      <section>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-16 text-center">
              <h1 className="text-2xl font-bold text-teal-700">
                Refund Policy
              </h1>
            </div>

            <div className="space-y-10 text-base leading-7 text-gray-700">
              <section>
                <h2 className="mb-4 text-2xl font-bold text-teal-700">
                  Refund Policy
                </h2>

                <p className="text-justify text-base">
                  Attobility provides digital subscription services through its
                  platforms and applications, including but not limited to
                  AttoLearn. Because access to digital services is granted
                  immediately upon payment, subscription fees are generally
                  non-refundable, except where required by applicable consumer
                  protection laws.
                </p>

                <p className="mt-4 text-justify text-base">
                  This Refund Policy explains the limited circumstances in which
                  a refund may be granted.
                </p>

                <div className="mt-6 text-base">
                  <h3 className="text-lg font-bold text-teal-700">
                    1. Eligibility for Refunds
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Refunds may be issued in limited situations such as:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                    <li>Duplicate or accidental payments</li>
                    <li>Billing errors or incorrect charges</li>
                    <li>
                      Technical errors that prevent activation of a purchased
                      subscription
                    </li>
                    <li>
                      Other exceptional circumstances determined by Attobility
                    </li>
                  </ul>

                  <p className="mt-4 text-justify text-base">
                    Refund requests must be submitted within 60 days of the
                    relevant billing charge.
                  </p>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    Attobility reserves the right to determine refund
                    eligibility at its reasonable discretion based on the
                    circumstances of each request.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    2. Non-Refundable Situations
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Except where required by applicable law, refunds will
                    generally not be provided in the following circumstances:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                    <li>Change of mind or personal preference</li>
                    <li>Partial use of a subscription period</li>
                    <li>
                      Failure to cancel a subscription before the next billing
                      cycle
                    </li>
                    <li>
                      Inability to access the Services due to user device
                      issues, internet connectivity, or third-party system
                      problems
                    </li>
                    <li>
                      Services that have already been delivered or substantially
                      used during the subscription period
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    3. Refund Request Process
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    To request a refund, please contact us at:{" "}
                    <a
                      href="mailto:info@attolearn.com"
                      className="font-medium text-[#007381] hover:underline"
                    >
                      info@attolearn.com
                    </a>
                  </p>

                  <p className="mt-4 text-justify text-base">
                    Your request should include:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                    <li>The email associated with your account</li>
                    <li>The date of the charge</li>
                    <li>A brief explanation of the issue</li>
                  </ul>

                  <p className="mt-4 text-justify text-base">
                    Approved refunds will be issued to the original payment
                    method used for the purchase.
                  </p>

                  <p className="mt-4 text-justify text-base">
                    Attobility will process approved refunds within 7 business
                    days of approval. Depending on your bank or payment
                    provider, it may take an additional 7–14 business days for
                    the refund to appear in your account. Refund timelines may
                    vary depending on the payment provider, banking procedures,
                    or financial institution involved.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    4. Effect of Refund
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    If a refund is granted, Attobility may suspend or revoke
                    access to the related paid Services associated with that
                    refund.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    5. Institutional or Enterprise Agreements
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Subscriptions purchased by schools, institutions,
                    enterprises, or resellers may be governed by separate
                    written agreements. Where such agreements exist, their terms
                    will prevail over this Refund Policy.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
