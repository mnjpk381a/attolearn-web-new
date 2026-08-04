export default function ShippingDeliveryPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-16">
      <section>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-16 text-center">
              <h1 className="text-2xl font-bold text-teal-700">
                Shipping and Delivery Policy
              </h1>
            </div>

            <div className="space-y-10 text-base leading-7 text-gray-700">
              <section>
                <h2 className="mb-4 text-2xl font-bold text-teal-700">
                  Shipping and Delivery Policy
                </h2>

                <p className="text-justify text-base">
                  Attobility provides digital subscription services through its
                  platforms and applications, including but not limited to
                  AttoLearn. As a result, no physical shipping or delivery of
                  goods occurs.
                </p>

                <div className="mt-6 text-base">
                  <h3 className="text-lg font-bold text-teal-700">
                    1. Digital Service Delivery
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Access to Attobility Services is delivered electronically.
                  </p>

                  <p className="mt-4 text-justify text-base">
                    Upon successful payment:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                    <li>
                      Your subscription or service access will typically be
                      activated immediately.
                    </li>
                    <li>
                      A confirmation email may be sent to the registered email
                      address.
                    </li>
                    <li>
                      Services can be accessed through the Attobility website,
                      application, or related platforms.
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    2. Activation Timing
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    In most cases, access is activated instantly after payment.
                    However, in rare situations such as payment verification or
                    technical delays, activation may take up to 24 hours.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    3. No Physical Shipping
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Attobility does not ship any physical goods. All services
                    are delivered digitally through our platforms.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    4. User Requirements
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    Access to the Services requires:
                  </p>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                    <li>A compatible device</li>
                    <li>A stable internet connection</li>
                    <li>Access to the Attobility website or application</li>
                  </ul>

                  <p className="mt-4 text-justify text-base">
                    Attobility is not responsible for service delays or access
                    issues caused by the user’s device, internet provider, or
                    third-party systems.
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-teal-700">
                    5. Support
                  </h3>

                  <p className="mt-3 text-justify text-base">
                    If you experience problems accessing your services after
                    payment, please contact us at:
                  </p>

                  <a
                    href="mailto:info@attolearn.com"
                    className="mt-3 inline-block font-medium text-[#007381] hover:underline text-base"
                  >
                    info@attolearn.com
                  </a>

                  <p className="mt-4 text-justify text-base">
                    Our support team will assist in resolving activation or
                    access issues.
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
