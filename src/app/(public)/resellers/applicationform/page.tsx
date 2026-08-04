"use client";

import API from "@/constants/API";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

type FormState = {
  fullName: string;
  personalEmail: string;
  personalPhone: string;
  personalCountry: string;
  personalState: string;
  personalCity: string;
  brandName: string;
  businessType: string;
  businessPhone: string;
  businessCity: string;
  registrationNumber: string;
  businessState: string;
  businessEmail: string;
  operationCountry: string;
  socialMedia: string;
  businessWebsite: string;
  motivation: string;
  whyChooseYou: string;
  workedBefore: string;
  experienceYears: string;
  targetRegions: string;
  categories: string[];
  methods: string[];
  networks: string[];
  infrastructure: string[];
  support: string[];
  methodOtherText: string;
  networkOtherText: string;
  infraOtherText: string;
  supportOtherText: string;
  declaration1: boolean;
  declaration2: boolean;
};

const initialForm: FormState = {
  fullName: "",
  personalEmail: "",
  personalPhone: "",
  personalCountry: "",
  personalState: "",
  personalCity: "",
  brandName: "",
  businessType: "",
  businessPhone: "",
  businessCity: "",
  registrationNumber: "",
  businessState: "",
  businessEmail: "",
  operationCountry: "",
  socialMedia: "",
  businessWebsite: "",
  motivation: "",
  whyChooseYou: "",
  workedBefore: "",
  experienceYears: "",
  targetRegions: "",
  categories: [],
  methods: [],
  networks: [],
  infrastructure: [],
  support: [],
  methodOtherText: "",
  networkOtherText: "",
  infraOtherText: "",
  supportOtherText: "",
  declaration1: false,
  declaration2: false,
};

const requiredFields: Array<{ key: keyof FormState; label: string }> = [
  { key: "fullName", label: "Full Name" },
  { key: "personalEmail", label: "Email Address" },
  { key: "personalPhone", label: "Phone Number" },
  { key: "personalCountry", label: "Country" },
  { key: "personalState", label: "State" },
  { key: "personalCity", label: "City" },
  { key: "brandName", label: "Business / Brand Name" },
  { key: "businessType", label: "Business Type" },
  { key: "businessEmail", label: "Business Email Address" },
  { key: "operationCountry", label: "Country of Operation" },
  { key: "motivation", label: "Motivation" },
  { key: "whyChooseYou", label: "Why should we choose you" },
  { key: "workedBefore", label: "Reseller experience" },
  { key: "experienceYears", label: "Years of experience" },
];

const categories = [
  "Education",
  "Healthcare Services",
  "Beautycare",
  "Real Estate",
  "Vehiclecare",
  "All",
];

const methods = [
  "In-person networking",
  "Social media campaigns",
  "WhatsApp/email outreach",
  "Paid ads",
  "Affiliate content/blogs",
  "Other",
];

const networks = [
  "Schools / Academies",
  "Clinics",
  "Beauty Salons",
  "Real estate agents",
  "None",
  "Other",
];

const infrastructure = [
  "Smartphone",
  "Laptop/Desktop",
  "Reliable Internet",
  "Social Media Presence",
  "Personal Network/Contacts",
  "Other",
];

const support = [
  "Product/Service training",
  "Marketing materials",
  "Technical support",
  "Sales mentoring",
  "Other",
];

function fieldClass(hasError: boolean) {
  return [
    "w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/15",
    hasError ? "border-red-500 ring-2 ring-red-100" : "border-slate-300",
  ].join(" ");
}

function listWithOther(values: string[], otherText: string) {
  return values
    .map((value) => (value === "Other" ? otherText.trim() : value))
    .filter(Boolean)
    .join(",");
}

export default function ManageResellerPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const toggleValue = (
    key: "categories" | "methods" | "networks" | "infrastructure" | "support",
    value: string,
  ) => {
    setForm((current) => {
      const values = current[key];
      const next = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];
      return { ...current, [key]: next };
    });
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    requiredFields.forEach(({ key, label }) => {
      const value = form[key];
      if (typeof value === "string" && !value.trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!form.categories.length) {
      nextErrors.categories = "Please select at least one category.";
    }

    if (!form.methods.length) {
      nextErrors.methods = "Please select at least one selling method.";
    }

    if (form.methods.includes("Other") && !form.methodOtherText.trim()) {
      nextErrors.methodOtherText = "Please specify the selling method.";
    }

    if (form.networks.includes("Other") && !form.networkOtherText.trim()) {
      nextErrors.networkOtherText = "Please specify the network.";
    }

    if (form.infrastructure.includes("Other") && !form.infraOtherText.trim()) {
      nextErrors.infraOtherText = "Please specify the infrastructure.";
    }

    if (form.support.includes("Other") && !form.supportOtherText.trim()) {
      nextErrors.supportOtherText = "Please specify the support.";
    }

    if (!form.declaration1) {
      nextErrors.declaration1 = "Please confirm the information is true.";
    }

    if (!form.declaration2) {
      nextErrors.declaration2 = "Please agree to the reseller terms.";
    }

    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document
        .querySelector(`[data-field="${firstError}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);

    if (!validate()) return;

    const payload = {
      id: 0,
      fullName: form.fullName,
      email: form.personalEmail,
      phone: form.personalPhone,
      country: form.personalCountry,
      state: form.personalState,
      city: form.personalCity,
      langusages: "",
      businessName: form.brandName,
      businessRegNumber: form.registrationNumber,
      businessType: form.businessType,
      businessEmail: form.businessEmail,
      businessPhone: form.businessPhone,
      businessCountry: form.operationCountry,
      businessState: form.businessState,
      businessCity: form.businessCity,
      socialMediaHandles: form.socialMedia,
      webURL: form.businessWebsite,
      motivationDetails: form.motivation,
      resellerReason: form.whyChooseYou,
      isPastReseller: form.workedBefore === "yes",
      resllerExperienceYears: form.experienceYears,
      categories: form.categories.join(","),
      preferredSellingMethods: listWithOther(
        form.methods,
        form.methodOtherText,
      ),
      relevantNetworks: listWithOther(form.networks, form.networkOtherText),
      resellingRegions: form.targetRegions,
      supportInfrastructures: listWithOther(
        form.infrastructure,
        form.infraOtherText,
      ),
      expectedSupports: listWithOther(form.support, form.supportOtherText),
      CreatedAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true);
      const response = await fetch(API.SAVE_RESELLER_APPLICATION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Server error while saving data.");
      }

      setForm(initialForm);
      setErrors({});
      setNotice({
        type: "success",
        text: "We have received your application and our team will review it within 5-7 working days. You'll be notified via email once a decision has been made.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Reseller application error:", error);
      setNotice({
        type: "error",
        text: "Unexpected error occurred while submitting your application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white">
      <section className="bg-slate-50 px-4 pb-10 pt-8">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#4fb4c0] text-white transition hover:bg-[#007381]"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-[#007381]">
              Become a Reseller
            </h1>
            <p className="mt-2 text-lg font-semibold text-slate-700">
              Join our reseller network and grow with us
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-10">
          {notice ? (
            <div
              className={[
                "rounded-md border px-4 py-3 text-sm font-semibold",
                notice.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700",
              ].join(" ")}
            >
              {notice.text}
            </div>
          ) : null}

          <FormSection
            kicker="Fill out the Form Below"
            title="Personal Information"
          >
            <TextInput
              label="Full Name*"
              field="fullName"
              value={form.fullName}
              error={errors.fullName}
              onChange={(value) => updateField("fullName", value)}
            />
            <TextInput
              label="Email Address*"
              field="personalEmail"
              type="email"
              value={form.personalEmail}
              error={errors.personalEmail}
              onChange={(value) => updateField("personalEmail", value)}
            />
            <TextInput
              label="Phone Number*"
              field="personalPhone"
              type="tel"
              value={form.personalPhone}
              error={errors.personalPhone}
              onChange={(value) => updateField("personalPhone", value)}
            />
            <TextInput
              label="Country*"
              field="personalCountry"
              value={form.personalCountry}
              error={errors.personalCountry}
              onChange={(value) => updateField("personalCountry", value)}
            />
            <TextInput
              label="State*"
              field="personalState"
              value={form.personalState}
              error={errors.personalState}
              onChange={(value) => updateField("personalState", value)}
            />
            <TextInput
              label="City*"
              field="personalCity"
              value={form.personalCity}
              error={errors.personalCity}
              onChange={(value) => updateField("personalCity", value)}
            />
          </FormSection>

          <FormSection title="Business / Work Details">
            <TextInput
              label="Business / Brand Name*"
              field="brandName"
              value={form.brandName}
              error={errors.brandName}
              onChange={(value) => updateField("brandName", value)}
            />
            <TextInput
              label="Business Type*"
              field="businessType"
              value={form.businessType}
              error={errors.businessType}
              onChange={(value) => updateField("businessType", value)}
            />
            <TextInput
              label="Business Phone Number"
              field="businessPhone"
              type="tel"
              value={form.businessPhone}
              onChange={(value) => updateField("businessPhone", value)}
            />
            <TextInput
              label="Business City"
              field="businessCity"
              value={form.businessCity}
              onChange={(value) => updateField("businessCity", value)}
            />
            <TextInput
              label="Business Registration Number"
              field="registrationNumber"
              value={form.registrationNumber}
              onChange={(value) => updateField("registrationNumber", value)}
            />
            <TextInput
              label="Business State"
              field="businessState"
              value={form.businessState}
              onChange={(value) => updateField("businessState", value)}
            />
            <TextInput
              label="Business Email Address*"
              field="businessEmail"
              type="email"
              value={form.businessEmail}
              error={errors.businessEmail}
              onChange={(value) => updateField("businessEmail", value)}
            />
            <TextInput
              label="Country of Operation*"
              field="operationCountry"
              value={form.operationCountry}
              error={errors.operationCountry}
              onChange={(value) => updateField("operationCountry", value)}
            />
            <TextInput
              label="Social Media Handles (if any)"
              field="socialMedia"
              value={form.socialMedia}
              onChange={(value) => updateField("socialMedia", value)}
            />
            <TextInput
              label="Business Website or Portfolio Link"
              field="businessWebsite"
              type="url"
              value={form.businessWebsite}
              onChange={(value) => updateField("businessWebsite", value)}
            />
            <TextArea
              label="What motivates you to become a reseller for Attobility?*"
              field="motivation"
              value={form.motivation}
              error={errors.motivation}
              onChange={(value) => updateField("motivation", value)}
            />
            <TextArea
              label="Why should we choose you as our reseller over others?*"
              field="whyChooseYou"
              value={form.whyChooseYou}
              error={errors.whyChooseYou}
              onChange={(value) => updateField("whyChooseYou", value)}
            />
          </FormSection>

          <FormSection title="Preferences & Experience">
            <SelectInput
              label="Have you worked as a reseller before?*"
              field="workedBefore"
              value={form.workedBefore}
              error={errors.workedBefore}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              onChange={(value) => updateField("workedBefore", value)}
            />
            <SelectInput
              label="Years of experience in reselling or sales*"
              field="experienceYears"
              value={form.experienceYears}
              error={errors.experienceYears}
              options={[
                { label: "NA", value: "NA" },
                { label: "Less than one year", value: "less" },
                { label: "1", value: "0-1" },
                { label: "2-4", value: "2-4" },
                { label: "5+", value: "5+" },
              ]}
              onChange={(value) => updateField("experienceYears", value)}
            />
            <CheckboxPanel
              title="Which categories are you interested in selling?*"
              field="categories"
              values={categories}
              selected={form.categories}
              error={errors.categories}
              onToggle={(value) => toggleValue("categories", value)}
            />
            <CheckboxPanel
              title="Preferred selling methods*"
              field="methods"
              values={methods}
              selected={form.methods}
              error={errors.methods}
              otherValue={form.methodOtherText}
              otherError={errors.methodOtherText}
              onOtherChange={(value) => updateField("methodOtherText", value)}
              onToggle={(value) => toggleValue("methods", value)}
            />
            <CheckboxPanel
              title="Do you have any relevant networks?"
              field="networks"
              values={networks}
              selected={form.networks}
              error={errors.networks}
              otherValue={form.networkOtherText}
              otherError={errors.networkOtherText}
              onOtherChange={(value) => updateField("networkOtherText", value)}
              onToggle={(value) => toggleValue("networks", value)}
            />
            <TextArea
              label="Regions/Cities you AIM to join us for reselling Attobility"
              field="targetRegions"
              value={form.targetRegions}
              onChange={(value) => updateField("targetRegions", value)}
            />
          </FormSection>

          <FormSection title="Sales Tools & Support">
            <CheckboxPanel
              title="Highlight the infrastructure you have to support the business"
              field="infrastructure"
              values={infrastructure}
              selected={form.infrastructure}
              error={errors.infrastructure}
              otherValue={form.infraOtherText}
              otherError={errors.infraOtherText}
              onOtherChange={(value) => updateField("infraOtherText", value)}
              onToggle={(value) => toggleValue("infrastructure", value)}
            />
            <CheckboxPanel
              title="What kind of support do you expect from us?"
              field="support"
              values={support}
              selected={form.support}
              error={errors.support}
              otherValue={form.supportOtherText}
              otherError={errors.supportOtherText}
              onOtherChange={(value) => updateField("supportOtherText", value)}
              onToggle={(value) => toggleValue("support", value)}
            />

            <div
              data-field="declaration1"
              className="rounded-md border border-slate-200 p-4 md:col-span-2"
            >
              <h3 className="mb-3 text-base font-bold text-slate-900">
                Declaration
              </h3>
              <label className="flex gap-3 text-sm leading-6 text-slate-700">
                <input
                  type="checkbox"
                  checked={form.declaration1}
                  onChange={(event) =>
                    updateField("declaration1", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-[#007381]"
                />
                <span>
                  I confirm that the information provided above is true and
                  I&apos;m genuinely interested in becoming a reseller for
                  Attobility.
                </span>
              </label>
              {errors.declaration1 ? (
                <ErrorText text={errors.declaration1} />
              ) : null}

              <label
                data-field="declaration2"
                className="mt-3 flex gap-3 text-sm leading-6 text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={form.declaration2}
                  onChange={(event) =>
                    updateField("declaration2", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-[#007381]"
                />
                <span>
                  I agree to comply with the organization&apos;s code of conduct
                  and reseller terms (to be provided upon selection).
                </span>
              </label>
              {errors.declaration2 ? (
                <ErrorText text={errors.declaration2} />
              ) : null}
            </div>
          </FormSection>

          <div className="flex justify-center pb-8">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-w-52 items-center justify-center gap-2 rounded-md bg-[#007381] px-8 py-3 text-base font-bold text-white transition hover:bg-[#005f6a] disabled:cursor-not-allowed disabled:bg-teal-400"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function FormSection({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {kicker ? (
        <h2 className="mb-8 text-center text-2xl font-extrabold text-[#007381]">
          {kicker}
        </h2>
      ) : null}
      <h3 className="mb-5 text-left text-xl font-bold text-slate-900">
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function TextInput({
  label,
  field,
  value,
  type = "text",
  error,
  onChange,
}: {
  label: string;
  field: keyof FormState;
  value: string;
  type?: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div data-field={field}>
      <input
        type={type}
        value={value}
        placeholder={label}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass(Boolean(error))}
      />
      {error ? <ErrorText text={error} /> : null}
    </div>
  );
}

function TextArea({
  label,
  field,
  value,
  error,
  onChange,
}: {
  label: string;
  field: keyof FormState;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div data-field={field}>
      <textarea
        value={value}
        placeholder={label}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass(Boolean(error))}
      />
      {error ? <ErrorText text={error} /> : null}
    </div>
  );
}

function SelectInput({
  label,
  field,
  value,
  options,
  error,
  onChange,
}: {
  label: string;
  field: keyof FormState;
  value: string;
  options: Array<{ label: string; value: string }>;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div data-field={field}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass(Boolean(error))}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <ErrorText text={error} /> : null}
    </div>
  );
}

function CheckboxPanel({
  title,
  field,
  values,
  selected,
  error,
  otherValue,
  otherError,
  onOtherChange,
  onToggle,
}: {
  title: string;
  field: keyof FormState;
  values: string[];
  selected: string[];
  error?: string;
  otherValue?: string;
  otherError?: string;
  onOtherChange?: (value: string) => void;
  onToggle: (value: string) => void;
}) {
  const showOther = selected.includes("Other") && onOtherChange;

  return (
    <div
      data-field={field}
      className={[
        "rounded-md border p-4",
        error ? "border-red-500 ring-2 ring-red-100" : "border-slate-200",
      ].join(" ")}
    >
      <h4 className="mb-3 text-sm font-bold text-slate-900">{title}</h4>
      <div className="space-y-2">
        {values.map((value) => (
          <label
            key={value}
            className="flex items-center gap-2 text-sm text-slate-700"
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(value)}
              className="h-4 w-4 accent-[#007381]"
            />
            <span>{value === "All" ? "All of the above" : value}</span>
          </label>
        ))}
      </div>
      {showOther ? (
        <div data-field={`${String(field)}Other`} className="mt-3">
          <input
            type="text"
            value={otherValue}
            placeholder="Please specify..."
            onChange={(event) => onOtherChange(event.target.value)}
            className={fieldClass(Boolean(otherError))}
          />
          {otherError ? <ErrorText text={otherError} /> : null}
        </div>
      ) : null}
      {error ? <ErrorText text={error} /> : null}
    </div>
  );
}

function ErrorText({ text }: { text: string }) {
  return <p className="mt-1 text-sm font-semibold text-red-600">{text}</p>;
}
