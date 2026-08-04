export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-16">
      <section>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-16 text-center">
              <h1 className="text-2xl font-bold text-teal-700">
                Return / Cancellation Policy
              </h1>
            </div>

            <div className="space-y-10 text-base leading-7 text-gray-700">
              <section>
                <h2 className="mb-4 text-2xl font-bold text-teal-700">
                  Return / Cancellation Policy
                </h2>

                <p className="text-justify text-base">
                  Attobility provides digital subscription services through its
                  platforms and applications, including but not limited to
                  AttoLearn. Because our Services are digital in nature, there
                  are no physical products to return.
                </p>

                <p className="mt-4 text-justify text-base">
                  This policy explains how subscription cancellations work.
                </p>

                <div className="mt-6 text-base">
                  <h3 className="text-lg font-bold text-teal-700">
                    1. Subscription Cancellation
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Users may cancel their subscription at any time by:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                    <li>Accessing their account settings, or</li>
                    <li>
                      Contacting{" "}
                      <a
                        href="mailto:info@attolearn.com"
                        className="font-medium text-[#007381] hover:underline"
                      >
                        info@attolearn.com
                      </a>
                    </li>
                  </ul>

                  <p className="mt-4 text-justify text-base">
                    When a subscription is cancelled:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                    <li>Cancellation prevents the next billing cycle.</li>
                    <li>
                      The subscription will remain active until the end of the
                      current paid billing period.
                    </li>
                  </ul>

                  <p className="mt-4 text-justify text-base">
                    Except where required by applicable law, no partial or
                    pro-rated refunds will be issued for unused time once a
                    billing period has begun.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    2. Free Trial
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    If you cancel during a free trial period, access to paid
                    features may end immediately or revert to the free version
                    of the Services.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    3. One-Time Digital Purchases
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Where Attobility offers one-time digital products or
                    services, those purchases are final and non-returnable once
                    delivered, unless otherwise required by applicable law.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    4. Institutional or Enterprise Agreements
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Subscriptions purchased by schools, institutions,
                    enterprises, or resellers may be governed by separate
                    written agreements. Where such agreements apply, their
                    cancellation terms will take precedence over this policy.
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
