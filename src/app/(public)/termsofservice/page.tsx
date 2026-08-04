"use client";

import { useState } from "react";
import Link from "next/link";

type ReadMoreCardProps = {
  title: string;
  children: React.ReactNode;
};

function ReadMoreCard({ title, children }: ReadMoreCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/70">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-2xl font-bold text-teal-700">{title}</h3>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 self-start bg-transparent p-0 text-sm font-medium text-[#007381] transition hover:text-[#004f58] hover:underline focus:outline-none sm:self-auto"
        >
          {expanded ? "Read less ↑" : "Read more →"}
        </button>
      </div>

      <div className="relative">
        <div
          className={`text-base leading-7 tracking-normal text-gray-600 transition-all duration-300 ${
            expanded ? "" : "max-h-[168px] overflow-hidden"
          }`}
        >
          {children}
        </div>

        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
    </div>
  );
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-16">
      <section className="mb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-teal-700">Terms of Use</h1>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="1. Acceptance of Terms of Use">
              <>
                <p className="text-base">
                  “Attobility” refers to Attobility Pty Ltd (Australia) and
                  Attobility (Firm, Pakistan), together with the digital
                  platforms, applications, products, and services operated or
                  owned by Attobility, including but not limited to AttoLearn
                  and any affiliated or future services (collectively referred
                  to as “Attobility,” “we,” “us,” or “our”).
                </p>

                <p className="mt-3 text-base">
                  Attobility operates and manages a range of digital platforms,
                  applications, and services through its various products and
                  brands. These include AttoLearn, which provides education,
                  learning, and school management services. Attobility may also
                  operate other platforms and services under separate brands
                  that provide solutions related to health and well-being
                  management, financial management, real estate and vehicle
                  management, lifestyle management tools, social networking
                  features, and related digital services. All such platforms,
                  applications, and services operated by Attobility are
                  collectively referred to in these Terms as the “Services.”
                </p>

                <p className="mt-3 text-base">
                  By registering for an account, accessing, browsing, or using
                  any of the Services on any Attobility-operated website or
                  platform, you agree to be bound by these Terms of Use, which
                  constitute a legally binding agreement between you and the
                  applicable Attobility entity.
                </p>

                <p className="mt-3 text-base">
                  If you do not agree to these Terms of Use, you must not access
                  or use the Services.
                </p>

                <p className="mt-3 text-base">
                  Your use of the Services is also subject to{" "}
                  <Link
                    href="/privacypolicy"
                    className="text-teal-700 underline"
                  >
                    Our Privacy Policy
                  </Link>{" "}
                  which is incorporated by reference into these Terms.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  1.1 Changes to Terms
                </h4>
                <p className="mt-2 text-base">
                  We may update or modify these Terms of Use at our discretion.
                  The most current version will be made available on our
                  website. Continued use of our services after updates are
                  posted constitutes acceptance of the revised Terms.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  1.2 International Access
                </h4>
                <p className="mt-2 text-base">
                  If you access the Services from outside Australia or Pakistan,
                  you are responsible for compliance with applicable local laws.
                  The contracting Attobility entity will be determined based on
                  your location or the entity specified in your service
                  agreement, invoice, or institutional contract.
                </p>
              </>
            </ReadMoreCard>

            <ReadMoreCard title="2. Limitation of Liability">
              <>
                <p className="text-base">
                  To the fullest extent permitted by law, Attobility excludes
                  all warranties, representations, and guarantees (whether
                  express or implied), except those that cannot be excluded
                  under applicable law.
                </p>

                <p className="mt-3 text-base">
                  Nothing in these Terms excludes, restricts, or modifies any
                  rights or remedies you may have under applicable consumer
                  protection laws, including the Competition and Consumer Act
                  2010 (Cth) in Australia. Where liability cannot be excluded,
                  Attobility’s liability is limited, at our option, to:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>The resupply of the relevant services; or</li>
                  <li>
                    The payment of the cost of having the services supplied
                    again.
                  </li>
                </ul>

                <p className="mt-3 text-base">
                  To the maximum extent permitted by law, Attobility is not
                  liable for any indirect, incidental, special, consequential,
                  or economic loss arising from your use of the Services.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  2.1 Third-Party Links and Content
                </h4>
                <p className="mt-2 text-base">
                  Our Services may contain links to third-party websites,
                  platforms, or content. Such links are provided for convenience
                  only. Attobility does not endorse, control, or assume
                  responsibility for third-party content or services. Access to
                  third-party websites is at your own risk and subject to their
                  terms and conditions.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  2.2 Health and Fitness Disclaimer
                </h4>
                <p className="mt-2 text-base">
                  Where Attobility provides health, wellness, or fitness-related
                  content, such content is provided for informational and
                  educational purposes only and does not constitute medical
                  advice. You should consult a qualified medical professional
                  before beginning any exercise, nutrition, or health-related
                  program. You use such services at your own risk.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  2.3 Education and Institutional Services Disclaimer
                  (AttoLearn)
                </h4>
                <p className="mt-2 text-base">
                  Where Attobility provides educational or institutional
                  services through AttoLearn, including learning platforms,
                  assessment tools, examination preparation materials,
                  administrative systems, and school management features:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    The Services are provided as support tools to assist
                    educational institutions, teachers, tutors, parents, and
                    students.
                  </li>
                  <li>
                    Attobility does not guarantee academic outcomes, examination
                    results, administrative accuracy, or regulatory compliance
                    of institutional records.
                  </li>
                  <li>
                    Users remain responsible for reviewing, verifying, and
                    approving all assessments, reports, records, and outputs
                    generated or facilitated by the platform.
                  </li>
                  <li>
                    Attobility is not liable for decisions, actions, or
                    omissions taken based on the use of educational or
                    administrative features.
                  </li>
                </ul>
              </>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="3. Your Privacy">
              <>
                <p className="text-base">
                  Attobility is committed to protecting your “personal
                  information” or “personally identifiable information” used
                  interchangeably in this agreement. Our collection, use,
                  disclosure, and handling of personal information is governed
                  by{" "}
                  <Link
                    href="/privacypolicy"
                    className="text-teal-700 underline"
                  >
                    Our Privacy Policy
                  </Link>
                  , which forms part of these Terms.
                </p>

                <p className="mt-3 text-base">
                  Attobility is registered in Australia and Pakistan and may
                  provide its Services to users globally. Attobility handles
                  personally identifiable information in accordance with
                  applicable privacy and data protection laws, including the
                  Australian Privacy Act 1988 (Cth) and other applicable laws
                  and regulations in jurisdictions where we operate.
                </p>

                <p className="mt-3 text-base">
                  By using our Services, you acknowledge that your personal
                  information will be handled in accordance with{" "}
                  <Link
                    href="/privacypolicy"
                    className="text-teal-700 underline"
                  >
                    Our Privacy Policy
                  </Link>
                  .
                </p>

                <p className="mt-3 text-base">
                  We implement reasonable technical and organizational measures
                  to protect personally identifiable information from
                  unauthorized access, misuse, loss, or disclosure. However, no
                  method of transmission over the internet or electronic storage
                  is completely secure.
                </p>

                <p className="mt-3 text-base">
                  We do not store full credit card details on our servers.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  3.1 Use of Information
                </h4>
                <p className="mt-2 text-base">
                  We do not sell personally identifiable information. We may use
                  aggregated or de-identified information for analytics, service
                  improvement, research, and business development purposes.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  3.2 Disclosure of Information
                </h4>
                <p className="mt-2 text-base">
                  We may disclose personal information:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>Where required by law or lawful order;</li>
                  <li>To enforce our Terms or other agreements;</li>
                  <li>
                    To protect the rights, property, or safety of Attobility,
                    our users, or third parties;
                  </li>
                  <li>
                    To service providers, payment processors, financial
                    institutions, or partners necessary to operate our Services.
                  </li>
                </ul>

                <p className="mt-3 text-base">
                  All disclosures are made in accordance with{" "}
                  <Link
                    href="/privacypolicy"
                    className="text-teal-700 underline"
                  >
                    Our Privacy Policy
                  </Link>
                  .
                </p>
              </>
            </ReadMoreCard>

            <ReadMoreCard title="4. Governing Law and Jurisdiction">
              <>
                <p className="text-base">
                  These Terms are governed by the laws of the jurisdiction of
                  the applicable Attobility contracting entity.
                </p>

                <p className="mt-3 text-base">
                  Where the contracting entity is Attobility Pty Ltd
                  (Australia), these Terms are governed by the laws of the
                  Commonwealth of Australia and the State in which Attobility
                  Pty Ltd is registered, and you submit to the exclusive
                  jurisdiction of the courts of that State and Australia.
                </p>

                <p className="mt-3 text-base">
                  Where the contracting entity is Attobility (Firm, Pakistan),
                  these Terms are governed by the laws of the Islamic Republic
                  of Pakistan, and you submit to the exclusive jurisdiction of
                  the courts of Pakistan.
                </p>

                <p className="mt-3 text-base">
                  The applicable contracting entity will be determined based on
                  your location or as specified in your invoice, service
                  agreement, institutional contract, or reseller agreement.
                  Nothing in these Terms limits any rights you may have under
                  mandatory consumer protection laws in your jurisdiction.
                </p>
              </>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="5. Intellectual Property Rights">
              <>
                <p className="text-base">
                  All content, software, systems, materials, databases,
                  assessment tools, question banks, educational materials,
                  administrative systems, graphics, trademarks, trade names,
                  logos, and other intellectual property made available through
                  Attobility’s platforms, applications, or services (including
                  AttoLearn, and affiliated products) are owned by or licensed
                  to Attobility.
                </p>

                <p className="mt-3 text-base">
                  Except as expressly permitted in writing by Attobility, you
                  may not:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    Copy, reproduce, distribute, modify, sell, license, or
                    commercially exploit any part of the Services;
                  </li>
                  <li>
                    Reverse engineer, decompile, disassemble, or attempt to
                    extract source code;
                  </li>
                  <li>Create derivative works from the Services;</li>
                  <li>
                    Use our content or systems to develop or operate a competing
                    product or service;
                  </li>
                  <li>Remove copyright, trademark, or proprietary notices.</li>
                </ul>

                <p className="mt-3 text-base">
                  You are granted a limited, non-exclusive, non-transferable,
                  revocable license to access and use the Services solely for
                  personal, educational, or internal institutional purposes in
                  accordance with these Terms.
                </p>

                <p className="mt-3 text-base">
                  All rights not expressly granted are reserved.
                </p>
              </>
            </ReadMoreCard>

            <ReadMoreCard title="6. Account Registration and Responsibility">
              <>
                <p className="text-base">
                  Certain features of the Services require account registration.
                  You agree to provide accurate, current, and complete
                  information when creating an account and to keep your
                  information updated.
                </p>

                <p className="mt-3 text-base">You are responsible for:</p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    Maintaining the confidentiality of your login credentials;
                  </li>
                  <li>All activities conducted under your account;</li>
                  <li>
                    Promptly notifying Attobility of any unauthorized use at{" "}
                    <a
                      href="mailto:info@attolearn.com"
                      className="text-[#007381] hover:underline"
                    >
                      info@attolearn.com
                    </a>
                  </li>
                </ul>

                <p className="mt-3 text-base">
                  Where accounts are created on behalf of schools, institutions,
                  parents, students or organizations, the registering party
                  represents that they are authorized to create and manage such
                  accounts.
                </p>

                <p className="mt-3 text-base">
                  Attobility’s handling of personal information is governed by{" "}
                  <Link
                    href="/privacypolicy"
                    className="text-teal-700 underline"
                  >
                    Our Privacy Policy
                  </Link>
                  . Further details about international data transfers are
                  described in{" "}
                  <Link
                    href="/privacypolicy"
                    className="text-teal-700 underline"
                  >
                    Our Privacy Policy
                  </Link>
                  .
                </p>
              </>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="7. Content Restrictions and Conduct">
              <>
                <p className="text-base">
                  You agree not to upload, post, transmit, or otherwise make
                  available any content that:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    Infringes intellectual property or other legal rights;
                  </li>
                  <li>
                    Is abusive, defamatory, discriminatory, obscene, or
                    unlawful;
                  </li>
                  <li>
                    Harasses, threatens, or exploits any individual, including
                    minors;
                  </li>
                  <li>
                    Constitutes spam, phishing, fraud, or deceptive conduct.
                  </li>
                </ul>

                <p className="mt-3 text-base">In addition, you must not:</p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    Use educational tools or assessment features for academic
                    dishonesty;
                  </li>
                  <li>Misuse examination materials or question banks;</li>
                  <li>
                    Attempt to access or extract data not authorized to you;
                  </li>
                  <li>Interfere with platform security or functionality;</li>
                  <li>Use the Services in violation of applicable laws.</li>
                </ul>

                <p className="mt-3 text-base">
                  Attobility reserves the right, but not the obligation, to
                  monitor content and activity. We may suspend, restrict, or
                  terminate accounts and remove content at our discretion where
                  necessary to protect users, comply with law, or preserve the
                  integrity of the Services.
                </p>
              </>
            </ReadMoreCard>

            <ReadMoreCard title="8. Fees, Subscriptions, and Payment">
              <>
                <p className="text-base">
                  Certain Services including but not limited to education,
                  institutional, or administrative features, may require payment
                  of subscription fees, license fees, or other charges.
                </p>

                <p className="mt-3 text-base">
                  By subscribing to a paid plan, you agree to the pricing,
                  billing frequency, and plan details presented to you at the
                  time of purchase. Additional terms presented during checkout,
                  institutional onboarding, or promotional offers form part of
                  these Terms.
                </p>

                <p className="mt-3 text-base">
                  Unless otherwise stated in writing:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    Except as required under applicable consumer protection
                    laws, fees are non-refundable.
                  </li>
                  <li>
                    Subscriptions automatically renew at the then-current rate
                    unless cancelled before the next billing cycle.
                  </li>
                  <li>
                    Billing occurs at the beginning of each subscription period.
                  </li>
                </ul>

                <p className="mt-3 text-base">
                  You are responsible for maintaining valid payment details. If
                  payment cannot be processed, Attobility may suspend or
                  restrict access to paid Services.
                </p>

                <p className="mt-3 text-base">
                  Where subscription pricing changes, we will provide reasonable
                  notice prior to the next billing cycle.
                </p>

                <p className="mt-3 text-base">
                  For individual subscriptions, cancellation will take effect at
                  the end of the current billing period.
                </p>

                <p className="mt-3 text-base">
                  Institutional, school, or enterprise subscriptions may be
                  subject to separate written agreements governing pricing,
                  renewal terms, and termination.
                </p>

                <p className="mt-3 text-base">
                  For details on cancellations and subscription returns, please
                  see our{" "}
                  <Link
                    href="/returnpolicy"
                    className="text-[#007381] hover:underline"
                  >
                    Return Policy
                  </Link>
                  .
                </p>
              </>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="9. Pricing and Currency">
              <>
                <p className="text-base">
                  Unless otherwise stated, prices for Services are displayed in
                  Australian Dollars (AUD) and are exclusive of taxes. For users
                  located in Pakistan, pricing may be displayed in Pakistani
                  Rupees (PKR). Pricing in other regions may be displayed in a
                  different currency where specified.
                </p>

                <p className="mt-3 text-base">
                  Where required by law, applicable taxes (including GST or
                  other sales taxes) will be added at checkout. Users located
                  outside Australia may be subject to local taxes in their
                  jurisdiction. You are responsible for any applicable taxes,
                  duties, or currency conversion charges imposed by your payment
                  provider.
                </p>

                <p className="mt-3 text-base">
                  Attobility reserves the right to modify pricing at any time.
                  Updated pricing will apply to new purchases and renewals after
                  reasonable notice.
                </p>

                <p className="mt-3 text-base">
                  Institutional, school, enterprise, or reseller pricing may be
                  governed by separate written agreements.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  9.1 Payment
                </h4>
                <p className="mt-2 text-base">
                  Paid Services operate on a subscription, license, or
                  usage-based billing model, as presented at the time of
                  purchase. By providing a payment method, you authorize
                  Attobility and its designated payment processors to charge the
                  applicable fees in accordance with your selected plan.
                </p>

                <p className="mt-3 text-base">
                  If payment is declined or cannot be processed, we may suspend
                  or restrict access to paid Services until payment is received.
                  Your payment provider’s agreement governs your use of your
                  chosen payment method.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  9.2 Cancellation and Refunds
                </h4>
                <p className="mt-2 text-base">
                  Unless otherwise stated in writing:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    Except as required under applicable consumer protection
                    laws, fees are non-refundable.
                  </li>
                  <li>
                    Cancellation of individual subscriptions takes effect at the
                    end of the current billing period.
                  </li>
                  <li>
                    Institutional or enterprise subscriptions may be subject to
                    separate contractual terms.
                  </li>
                </ul>

                <p className="mt-3 text-base">
                  Refunds may be issued at Attobility’s discretion in cases of
                  duplicate charges, billing errors, or technical issues,
                  provided a request is made within 60 days of the charge.
                  Approved refunds will be issued to the original payment
                  method. For details, please see our{" "}
                  <Link
                    href="/refundpolicy"
                    className="text-[#007381] hover:underline"
                  >
                    Refund Policy
                  </Link>
                  .
                </p>
              </>
            </ReadMoreCard>

            <ReadMoreCard title="10. Delivery of Services">
              <p className="text-base">
                The Services are digital in nature and delivered electronically
                through the web portals, websites, Apps and affiliated
                platforms. Service access is granted instantly upon successful
                payment. No physical shipping is involved. For details, please
                see our{" "}
                <Link
                  href="/shippingdeliverypolicy"
                  className="text-[#007381] hover:underline"
                >
                  Shipping and Delivery Policy
                </Link>
                .
              </p>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="11. Your Representations and Warranties">
              <>
                <p className="text-base">
                  By accessing or using the Services, you represent and warrant
                  that:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    You have the legal capacity to enter into a binding
                    agreement with us; or
                  </li>
                  <li>
                    Where you are under the age of majority, you are using the
                    Services with the consent and supervision of a parent,
                    guardian, or authorized educational institution, as
                    applicable.
                  </li>
                </ul>

                <p className="mt-3 text-base">
                  You agree that your use of the Services complies with all
                  applicable laws, rules, and regulations in your jurisdiction.
                </p>

                <p className="mt-3 text-base">
                  Attobility may refuse access to the Services to any person or
                  entity at its discretion, including where eligibility
                  requirements are not met.
                </p>

                <p className="mt-3 text-base">
                  Where accounts are created on behalf of a school, institution,
                  organization, parent, or minor, the registering party
                  represents that they are authorized to act on behalf of such
                  users.
                </p>

                <p className="mt-3 text-base">
                  The Services are provided for personal, educational, or
                  internal institutional use only, unless otherwise agreed in
                  writing.
                </p>

                <p className="mt-3 text-base">
                  If you become aware of unauthorized access to your account,
                  change your password and notify us immediately at{" "}
                  <a
                    href="mailto:info@attolearn.com"
                    className="text-[#007381] hover:underline"
                  >
                    info@attolearn.com
                  </a>
                  .
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  11.1 User Content Representations
                </h4>
                <p className="mt-2 text-base">
                  For any content you upload, submit, or transmit through the
                  Services, you represent and warrant that:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                  <li>
                    You have the legal right and authority to submit such
                    content;
                  </li>
                  <li>
                    The content does not infringe any third-party rights,
                    including intellectual property or privacy rights;
                  </li>
                  <li>
                    Attobility (including AttoLearn) is not required to obtain
                    additional licenses or pay royalties to third parties;
                  </li>
                  <li>
                    The content complies with these Terms and applicable laws.
                  </li>
                </ul>

                <p className="mt-3 text-base">
                  You are solely responsible for content submitted under your
                  account.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  11.2 Indemnification
                </h4>
                <p className="mt-2 text-base">
                  You agree to indemnify, defend, and hold harmless Attobility
                  (including AttoLearn) and its directors, officers, employees,
                  and agents from and against all claims, damages, losses, and
                  costs arising from or related to:
                </p>

                <ol className="mt-3 list-decimal space-y-2 pl-5 text-base">
                  <li>Your activities on the Service.</li>
                  <li>Any user content submitted by or on behalf of you.</li>
                  <li>Your violation of this agreement.</li>
                </ol>
              </>
            </ReadMoreCard>

            <ReadMoreCard title="12. Suspension / Termination">
              <>
                <p className="text-base">
                  Attobility, in its sole discretion, may suspend or terminate
                  your account or membership (in whole or in part), delete or
                  block any content submitted by you, and restrict your ability
                  to re-register or access Services at any time if:
                </p>

                <ol className="mt-3 list-decimal space-y-2 pl-5 text-base">
                  <li>You violate any provision of these Terms of Service.</li>
                  <li>Your payment is more than 15 days overdue.</li>
                  <li>
                    You engage in conduct that violates any applicable law or
                    regulation (including, without limitation, copyright or
                    intellectual property laws).
                  </li>
                  <li>
                    You engage in conduct that is threatening, abusive, or
                    harassing toward Attobility employees, agents, or other
                    users (e.g., making threats of physical harm or property
                    damage).
                  </li>
                  <li>
                    You engage in conduct that harms the goodwill or reputation
                    of Attobility and/or its users.
                  </li>
                </ol>

                <p className="mt-3 text-base">
                  On termination or suspension, unless expressed otherwise in
                  this agreement, all rights and authorisations granted by both
                  parties under this agreement shall cease to exist. However,
                  any provisions that by their nature should reasonably survive
                  termination will continue to apply. This includes, but is not
                  limited to, provisions relating to limitation of liability,
                  intellectual property rights, privacy and data management,
                  payment obligations, user representations and warranties,
                  indemnification, governing law, force majeure, entire
                  agreement, and severability.
                </p>
              </>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="13. Data Management and Security">
              <>
                <h4 className="text-lg font-bold text-teal-700">
                  13.1 – Data Retention
                </h4>
                <p className="mt-2 text-base">
                  Attobility will retain your personal information only for as
                  long as is reasonably necessary to provide you with our
                  Services, to comply with our legal obligations, to resolve
                  disputes, and to enforce our agreements. After this period,
                  your information will be securely deleted or de-identified in
                  accordance with applicable law.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  13.2 – Security Controls
                </h4>
                <p className="mt-2 text-base">
                  Attobility implements appropriate technical and organisational
                  measures to safeguard your data, including encryption, access
                  controls, and secure storage systems. While we take these
                  precautions, no method of electronic transmission or storage
                  is completely secure, and we cannot guarantee absolute
                  security of your data.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  13.3 – Data Breach Notification
                </h4>
                <p className="mt-2 text-base">
                  In the event of an eligible data breach, Attobility will
                  comply with the local Privacy Act and laws. This includes
                  taking urgent steps to contain the breach, assessing the
                  risks, and notifying affected individuals and relevant parties
                  where legally required.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  13.4 – Children’s Data and Age Requirements
                </h4>
                <p className="mt-2 text-base">
                  The general Attobility platform is intended for individuals
                  who are at least 14 years of age. Users under the age of 14
                  may not create or maintain an Attobility account directly.
                </p>

                <p className="mt-3 text-base">
                  However, certain Attobility Services, including AttoLearn, are
                  designed to support learning for students of various age
                  groups, including minors and under 14 years old. In such
                  cases, accounts for students must be created and managed by a
                  parent, legal guardian, school, or authorized educational
                  institution.
                </p>

                <p className="mt-3 text-base">
                  We do not knowingly collect personal information directly from
                  children under the age of 14 without appropriate parental,
                  guardian, or school authorization, as required by applicable
                  laws.
                </p>

                <p className="mt-3 text-base">
                  Parents, guardians, and educational institutions are
                  responsible for supervising the student’s use of the Services
                  and providing any necessary consent for the collection and use
                  of student information.
                </p>

                <p className="mt-3 text-base">
                  If Attobility becomes aware that personal information from a
                  child has been collected without appropriate authorization, we
                  will take reasonable steps to delete the information or obtain
                  the required consent.
                </p>
              </>
            </ReadMoreCard>

            <ReadMoreCard title="14. Service Terms">
              <>
                <h4 className="text-lg font-bold text-teal-700">
                  14.1 – Uptime and Service Levels
                </h4>
                <p className="mt-2 text-base">
                  Attobility will use reasonable commercial efforts to make the
                  Attobility services available with a minimum uptime of 99% per
                  calendar month, excluding scheduled maintenance, emergency
                  maintenance, and events beyond our reasonable control. This
                  uptime commitment is a service target only and does not
                  constitute a warranty.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  14.2 – Support Hours
                </h4>
                <p className="mt-2 text-base">
                  Attobility provides customer support via email at{" "}
                  <a
                    href="mailto:info@attolearn.com"
                    className="text-[#007381] hover:underline"
                  >
                    info@attolearn.com
                  </a>{" "}
                  during standard business hours (Monday to Friday, 9:00 am –
                  5:00 pm, excluding public holidays). Response times may vary
                  depending on the nature of the request.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  14.3 – Scheduled Maintenance
                </h4>
                <p className="mt-2 text-base">
                  Attobility may perform routine system maintenance and upgrades
                  periodically. Where practicable, notice of scheduled
                  maintenance will be provided in advance via the Attobility
                  website or application. During these periods, services may be
                  temporarily unavailable. Emergency maintenance may also be
                  required without prior notice.
                </p>

                <h4 className="mt-4 text-lg font-bold text-teal-700">
                  14.4 – Force Majeure
                </h4>
                <p className="mt-2 text-base">
                  Attobility will not be liable or responsible for any failure
                  or delay in performance arising out of or caused by events
                  beyond our reasonable control, including but not limited to
                  acts of God, natural disasters, pandemics, labour disputes,
                  governmental actions, utility or telecommunications failures,
                  cyberattacks, or interruptions in internet or hosting
                  services. In such cases, Attobility’s obligations will be
                  suspended for the duration of the event, and we will use
                  reasonable efforts to resume service as soon as practicable.
                </p>
              </>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <ReadMoreCard title="15. Whole Agreement">
              <p className="text-base">
                These Terms constitute the entire agreement between you and
                Attobility regarding your use of the Services and supersede any
                prior agreements or understandings relating to the Services.
              </p>
            </ReadMoreCard>

            <ReadMoreCard title="16. Severability">
              <p className="text-base">
                If any provision of these Terms is found to be invalid, illegal,
                or unenforceable, the remaining provisions will continue in full
                force and effect.
              </p>
            </ReadMoreCard>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-fr">
            <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-2xl font-bold text-teal-700">
                17. Contact
              </h3>
              <p className="text-base leading-7 text-gray-700">
                Send Email to:{" "}
                <a
                  href="mailto:info@attolearn.com"
                  className="text-[#007381] hover:underline"
                >
                  info@attolearn.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
