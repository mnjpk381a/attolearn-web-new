"use client";

import { useState } from "react";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
};

function SectionCard({
  title,
  children,
  defaultExpanded = false,
}: SectionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold text-teal-700">{title}</h3>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 border-none bg-transparent p-0 text-sm font-medium text-[#007381] transition hover:text-[#004f58] hover:underline focus:outline-none"
        >
          {expanded ? "Read less ↑" : "Read more →"}
        </button>
      </div>

      <div className="relative mt-4">
        <div
          className={`text-justify text-base leading-7 text-gray-700 transition-all duration-300 ${
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

function PolicySection({
  number,
  title,
  children,
  defaultExpanded = false,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  return (
    <SectionCard
      title={`${number}. ${title}`}
      defaultExpanded={defaultExpanded}
    >
      {children}
    </SectionCard>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-10 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-teal-700">
            Our Privacy Policy
          </h1>
        </div>

        <div className="space-y-6">
          <PolicySection number="1" title="Introduction" defaultExpanded>
            <>
              <p className="text-base">
                This Privacy Policy explains how Attobility collects, uses,
                discloses, and protects personal information when you access or
                use our websites, applications, platforms, and related services.
              </p>

              <p className="mt-4 text-base">
                “Attobility” refers to Attobility Pty Ltd (Australia) and
                Attobility (Firm, Pakistan), together with the digital
                platforms, applications, products, and services operated or
                owned by Attobility, including but not limited to AttoLearn and
                any affiliated or future services (collectively referred to as
                “Attobility,” “we,” “us,” or “our”).
              </p>

              <p className="mt-4 text-base">
                Attobility operates and manages a range of digital platforms and
                services through its various products and brands. These include
                AttoLearn, which provides education, learning, and school
                management services. Attobility may also operate additional
                platforms and services under separate brands that provide
                solutions related to health and well-being management, financial
                management, real estate and vehicle management, lifestyle
                management tools, social networking features, and other digital
                services.
              </p>

              <p className="mt-4 text-base">
                All such platforms, applications, and services operated by
                Attobility are collectively referred to in this Privacy Policy
                as the “Services.”
              </p>

              <p className="mt-4 text-base">
                By accessing or using our Services, you acknowledge that your
                personal information will be collected, used, disclosed, and
                processed in accordance with this Privacy Policy.
              </p>

              <p className="mt-4 text-base">
                If you do not agree with the practices described in this Privacy
                Policy, you should discontinue use of our Services.
              </p>
            </>
          </PolicySection>

          <PolicySection number="2" title="Personal Information">
            <p className="text-base">
              “Personal Information” has the meaning defined in the Data Privacy
              Acts and/or Laws applicable to you. It includes any information or
              an opinion about an identified individual, or an individual who is
              reasonably identifiable. This includes information such as your
              name, email address, phone number, postal address, payment
              details, or any other information that can reasonably identify
              you.
            </p>
          </PolicySection>

          <PolicySection number="3" title="Information we collect">
            <>
              <p className="text-base">
                Attobility collects personal information that is reasonably
                necessary to provide and operate our Services. The types of
                information we collect may vary depending on how you interact
                with the Services.
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.1. Sources of Information
                  </h4>
                  <p className="mt-2 text-base">
                    We may collect personal information directly from you,
                    automatically through your use of the Services, or from
                    third parties where permitted by law. For example,
                    information may be collected when you create an account, use
                    our applications, communicate with us, connect third-party
                    services or devices, or when educational institutions or
                    partners provide information necessary to deliver the
                    Services.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.2. Anonymous or Pseudonymous Interaction
                  </h4>
                  <p className="mt-2 text-base">
                    Where practical, individuals may choose not to identify
                    themselves or may use a pseudonym when interacting with
                    Attobility, such as when making general inquiries. However,
                    for certain Services, including account registration,
                    subscription services, or educational platform features,
                    identification may be required.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.3. Account and Profile Information
                  </h4>
                  <p className="mt-2 text-base">
                    When you create an account or interact with our Services, we
                    may collect personal information such as your name, email
                    address, date of birth, contact details, country of
                    residence, and other profile or account information you
                    choose to provide. You may also provide additional
                    information such as preferences, language settings, or other
                    details used to personalize your experience on the platform.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.4. Health and Activity Information (Where Applicable)
                  </h4>
                  <p className="mt-2 text-base">
                    Certain Attobility Services may allow users to record
                    health, wellness, or activity-related information. This may
                    include information such as height, weight, activity levels,
                    fitness progress, or other health-related data voluntarily
                    entered by the user or generated through connected devices
                    such as smartwatches or fitness trackers.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.5. User Content and Communications
                  </h4>
                  <p className="mt-2 text-base">
                    We may collect information that you choose to submit through
                    the Services, including content shared in community forums,
                    chats, messages, uploaded media, feedback, reviews, or
                    survey responses. We may also collect information from
                    communications you send to us, such as emails, customer
                    support requests, or messages through social media channels.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.6. Education Data (AttoLearn)
                  </h4>
                  <p className="mt-2 text-base">
                    Where you use AttoLearn, we may collect information
                    necessary to provide educational services. This may include
                    information relating to students, parents, teachers, tutors,
                    or educational institutions, as well as academic records,
                    course information, learning progress, assignment
                    submissions, feedback, and educational usage analytics.
                  </p>
                  <p className="mt-3 text-base">
                    Where educational institutions upload or manage student data
                    through AttoLearn, the institution remains responsible for
                    obtaining any permissions, authorizations, or consents
                    required under applicable laws. In such cases, the
                    institution determines how student data is used within the
                    educational context, while Attobility provides the platform
                    and technical services necessary to deliver the educational
                    functionality.
                  </p>
                  <p className="mt-3 text-base">
                    Attobility collects only the information reasonably
                    necessary to provide educational services. We do not sell
                    student personal information and do not use student personal
                    information collected through educational services for
                    targeted advertising or marketing purposes.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.7. Payment and Transaction Information
                  </h4>
                  <p className="mt-2 text-base">
                    If you purchase Services through the platform, we may
                    collect transaction and billing information associated with
                    the purchase. Payment processing may be handled by
                    third-party payment providers, and Attobility does not store
                    full credit card details on its servers.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-teal-700">
                    3.8. Technical and Usage Information
                  </h4>
                  <p className="mt-2 text-base">
                    When you access or use our Services, we may automatically
                    collect technical information about your device and
                    interaction with the platform. This may include information
                    such as IP address, device type, browser type, pages
                    visited, session duration, traffic logs, and other usage
                    data collected through cookies or similar technologies.
                  </p>
                  <p className="mt-3 text-base">
                    We may collect personal information directly from you,
                    automatically through your use of the Services, or in some
                    cases from third-party partners or service providers.
                  </p>
                </div>
              </div>
            </>
          </PolicySection>

          <PolicySection number="4" title="Unsolicited Personal Information">
            <>
              <p className="text-base">
                Attobility may occasionally receive personal information that we
                have not requested (“unsolicited personal information”). If this
                occurs, we will determine within a reasonable period whether we
                could have lawfully collected the information under applicable
                privacy laws if it had been requested.
              </p>
              <p className="mt-4 text-base">
                If we determine that we could have collected the information, we
                will treat it in accordance with this Privacy Policy.
              </p>
              <p className="mt-4 text-base">
                If we determine that we could not have lawfully collected the
                information, we will take reasonable steps to destroy or
                de-identify the information as soon as practicable, unless we
                are required or permitted by law to retain it.
              </p>
            </>
          </PolicySection>

          <PolicySection number="5" title="Sensitive Information">
            <>
              <p className="text-base">
                Some Attobility Services may allow users to provide sensitive
                information, such as health-related data.
              </p>
              <p className="mt-4 text-base">
                Sensitive information may include health data, biometric
                identifiers, genetic data, racial or ethnic origin, or other
                information defined as sensitive under applicable privacy laws.
              </p>
              <p className="mt-4 text-base">
                We collect sensitive information only with your explicit consent
                or where permitted by applicable law.
              </p>
            </>
          </PolicySection>

          <PolicySection number="6" title="How We Use Personal Information">
            <>
              <p className="text-base">
                We may use personal information for purposes including:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
                <li>Providing and operating the Services</li>
                <li>Creating and managing user accounts</li>
                <li>Delivering educational services through AttoLearn</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Providing customer support</li>
                <li>
                  Improving the functionality and performance of the Services
                </li>
                <li>Conducting analytics and service improvement</li>
                <li>Preventing fraud, misuse, or unlawful activities</li>
                <li>Enforcing our Terms of Use</li>
                <li>Sending service updates or communications</li>
                <li>
                  Delivering marketing communications where permitted by law or
                  with your consent
                </li>
              </ul>
              <p className="mt-4 text-base">
                Where we use personal information for new purposes, we will
                provide appropriate notice or obtain consent where required,
                unless otherwise permitted by applicable laws.
              </p>
            </>
          </PolicySection>

          <PolicySection number="7" title="Disclosure of Personal Information">
            <>
              <p className="text-base">
                We may disclose personal information to third parties where
                necessary to operate the Services, including:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
                <li>Technology service providers and hosting providers</li>
                <li>Payment processors and financial institutions</li>
                <li>Customer support providers</li>
                <li>Business partners providing integrated services</li>
                <li>Professional advisors such as lawyers or accountants</li>
                <li>
                  Government authorities or regulators where required by law
                </li>
                <li>Related companies or affiliates of Attobility</li>
              </ul>
              <p className="mt-4 text-base">
                Where users choose to share content publicly on forums, chats,
                or social features, that content may become publicly accessible.
              </p>
              <p className="mt-4 text-base">
                Attobility does not allow third parties to use personal
                information for purposes unrelated to providing services to
                Attobility.
              </p>
            </>
          </PolicySection>

          <PolicySection number="8" title="Third-Party Services">
            <>
              <p className="text-base">
                Our Services may include links or integrations with third-party
                platforms. When you interact with those services, their privacy
                policies will apply.
              </p>
              <p className="mt-4 text-base">
                We do not control how third-party services collect or use your
                information. We encourage users to review third-party privacy
                policies before providing personal information.
              </p>
            </>
          </PolicySection>

          <PolicySection number="9" title="International Data Transfers">
            <>
              <p className="text-base">
                Attobility operates globally and may transfer personal
                information across international borders.
              </p>
              <p className="mt-4 text-base">
                Personal information may be stored or processed on servers
                located in the United States, Australia, Europe, and Asia, or
                other locations where our service providers operate.
              </p>
              <p className="mt-4 text-base">
                We take reasonable steps to ensure that personal information
                transferred internationally is protected in accordance with
                applicable data protection laws.
              </p>
            </>
          </PolicySection>

          <PolicySection number="10" title="Cookies and Tracking Technologies">
            <>
              <p className="text-base">
                A cookie is a small file stored on your device that helps
                websites recognize returning users.
              </p>
              <p className="mt-4 text-base">
                We may use cookies and similar technologies to:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base">
                <li>Maintain login sessions</li>
                <li>Improve website performance</li>
                <li>Analyze usage patterns</li>
                <li>Personalize content and features</li>
                <li>Measure the effectiveness of marketing activities</li>
              </ul>
              <p className="mt-4 text-base">
                You may adjust your browser settings to disable cookies,
                although doing so may affect the functionality of certain
                Services.
              </p>
            </>
          </PolicySection>

          <PolicySection number="11" title="Security">
            <>
              <p className="text-base">
                We implement commercially reasonable technical and
                organizational security measures designed to protect personal
                information from unauthorized access, disclosure, alteration, or
                destruction.
              </p>
              <p className="mt-4 text-base">
                However, no method of transmission over the internet or
                electronic storage can be guaranteed to be completely secure.
              </p>
              <p className="mt-4 text-base">
                Users are responsible for maintaining the confidentiality of
                their account credentials. For further details, see our Data
                Management and Securityclause in Terms of Services.
              </p>
            </>
          </PolicySection>

          <PolicySection number="12" title="Data Retention">
            <>
              <p className="text-base">
                We retain personal information only for as long as necessary to
                provide our Services, comply with legal obligations, resolve
                disputes, and enforce our agreements.
              </p>
              <p className="mt-4 text-base">
                Where personal information is no longer required, we take
                reasonable steps to securely delete or de-identify it.
              </p>
            </>
          </PolicySection>

          <PolicySection
            number="13"
            title="Access and Correction of Personal Information"
          >
            <>
              <p className="text-base">
                You may request access to personal information we hold about
                you.
              </p>
              <p className="mt-4 text-base">
                You may also request correction of inaccurate or incomplete
                personal information.
              </p>
              <p className="mt-4 text-base">
                In many cases, users may update their information directly
                through their account settings.
              </p>
              <p className="mt-4 text-base">
                Requests may be submitted through the contact details provided
                below.
              </p>
            </>
          </PolicySection>

          <PolicySection number="14" title="Withdrawal of Consent">
            <>
              <p className="text-base">
                Where personal information is processed based on your consent,
                you may withdraw that consent at any time.
              </p>
              <p className="mt-4 text-base">
                Once consent is withdrawn, we will stop processing your
                information for the relevant purpose unless we are legally
                required or permitted to continue processing.
              </p>
            </>
          </PolicySection>

          <PolicySection number="15" title="Information About Minors">
            <>
              <p className="text-base">
                The general Attobility platform is intended for individuals aged
                14 years or older, and users under 14 may not create accounts
                directly. However, certain Services such as AttoLearn may be
                used by students or minors under the supervision of parents,
                guardians, or educational institutions as required by applicable
                law.
              </p>
              <p className="mt-4 text-base">
                Attobility does not knowingly collect personal information from
                children without appropriate authorization where required by
                law.
              </p>
              <p className="mt-4 text-base">
                Parents and guardians are encouraged to supervise
                children&apos;s use of online services.
              </p>
            </>
          </PolicySection>

          <PolicySection number="16" title="Changes to this Privacy Policy">
            <>
              <p className="text-base">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="mt-4 text-base">
                The most current version will always be available on our
                website. Changes will take effect once the updated policy is
                published.
              </p>
            </>
          </PolicySection>

          <PolicySection number="17" title="Contact Us" defaultExpanded>
            <>
              <p className="text-base">
                If you have questions about this Privacy Policy or how your
                personal information is handled, please contact us:
              </p>

              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <p className="font-semibold text-teal-700">Email:</p>
                <a
                  href="mailto:info@attolearn.com"
                  className="mt-1 inline-block text-[#007381] hover:underline"
                >
                  info@attolearn.com
                </a>
              </div>
            </>
          </PolicySection>
        </div>
      </div>
    </main>
  );
}
