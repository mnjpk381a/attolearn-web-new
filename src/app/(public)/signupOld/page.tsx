"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import API from "@/constants/API";
import {
  FaUser,
  FaSchool,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

// ---------------- TYPES ----------------
type PlanPrice = {
  isActive?: boolean;
  planPriceID?: number;
  priceID?: number;
};

type SubscriptionPlan = {
  planID: number | string;
  planName: string;
  prices?: PlanPrice[];
};

type GetPlansResponse = {
  success?: boolean;
  data?: SubscriptionPlan[];
};

type SignupResponse = {
  user?: unknown;
  sessiontoken?: unknown;
  message?: string;
};

// ---------------- SCHEMA ----------------

const SignupSchema = z.object({
  schoolName: z.string().min(1, "School Name is required"),
  contactPersonName: z.string().min(1, "Contact Person Name is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  city: z.string().min(1, "City is required"),
  numberOfStudents: z.string().optional(),
  planId: z.string().min(1, "Selected product is required"),
});

type SignupFormType = z.infer<typeof SignupSchema>;

// ---------------- SHARED INPUT ----------------

function Input({
  label,
  icon,
  type = "text",
  placeholder,
  register,
  error,
}: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#007381]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#007381]">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className={[
            "w-full pl-10 pr-4 py-3 border rounded-lg bg-white text-[#007381]",
            "focus:outline-none focus:ring-2 focus:ring-[#007381]/20 focus:border-[#007381]",
            error ? "border-red-400" : "border-gray-300",
          ].join(" ")}
        />
      </div>
      {error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}
    </div>
  );
}

// ---------------- INNER COMPONENT ----------------

function SignupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const planFromQuery = useMemo(
    () => searchParams.get("plan") ?? "",
    [searchParams],
  );

  const selectedProductLabel = useMemo(() => {
    if (planFromQuery === "1" || planFromQuery === "plan1") {
      return "Paper Generator";
    }
    if (planFromQuery === "2" || planFromQuery === "plan2") {
      return "School Management System";
    }
    return "Not selected";
  }, [planFromQuery]);

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      schoolName: "",
      contactPersonName: "",
      email: "",
      phoneNumber: "",
      city: "",
      numberOfStudents: "",
      planId: planFromQuery,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    form.setValue("planId", planFromQuery || "", { shouldValidate: true });
  }, [planFromQuery, form]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const resp = await axios.get<GetPlansResponse>(
          API.GET_SUBSCRIPTION_PLANS,
        );

        if (resp.data?.success && Array.isArray(resp.data.data)) {
          setPlans(resp.data.data);
        } else {
          setPlans([]);
        }
      } catch (e: unknown) {
        console.error(e);
        toast.error("Failed to load plans");
      }
    };

    fetchPlans();
  }, []);

  const onSubmit = async (data: SignupFormType) => {
    setLoading(true);

    try {
      const selectedPlan = plans.find(
        (p) => String(p.planID) === String(data.planId),
      );

      const firstPrice =
        selectedPlan?.prices?.find((p) => p.isActive) ??
        selectedPlan?.prices?.[0];

      const nameParts = data.contactPersonName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const payload = {
        method: 1,
        firstName,
        lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        typeId: 19,
        schoolId: 0,
        claimCode: "",
        provider: "",
        providerKey: "",
        school: {
          name: data.schoolName,
          city: data.city,
          primaryPhone: data.phoneNumber,
          email: data.email,
        },
        subscription: {
          schoolID: 0,
          planID: Number(data.planId) || 0,
          planPriceID: firstPrice?.planPriceID ?? firstPrice?.priceID ?? 0,
          status: "Trialing",
          startDate: new Date().toISOString(),
          endDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          trialEndDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          autoRenew: false,
          createdByUserID: 0,
          createdOn: new Date().toISOString(),
        },
        isAdmin: true,
        deviceToken: "",
        selectedProductLabel,
        numberOfStudents: data.numberOfStudents ?? "",
      };

      const response = await axios.post<SignupResponse>(
        API.PKUSER_SIGNUP_MULTI_STEP,
        payload,
      );

      if (response.data?.user && response.data?.sessiontoken) {
        setCookie("currUserData", JSON.stringify(response.data.user));
        setCookie("sessionToken", JSON.stringify(response.data.sessiontoken));
        setCookie(
          "completeRegistrationData",
          JSON.stringify({ ...data, selectedProductLabel }),
        );

        toast.success("Registration successful");
        router.push("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (err: unknown) {
      console.error(err);
      const ax = err as AxiosError<{ message?: string }>;
      toast.error(ax?.response?.data?.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#007381]">
          Let&apos;s Get Your School Started
        </h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="School Name"
            icon={<FaSchool />}
            placeholder="e.g. City Grammar School"
            register={form.register("schoolName")}
            error={form.formState.errors.schoolName?.message}
          />

          <Input
            label="Contact Person Name"
            icon={<FaUser />}
            placeholder="e.g. Ali Khan"
            register={form.register("contactPersonName")}
            error={form.formState.errors.contactPersonName?.message}
          />

          <Input
            label="Email"
            icon={<FaEnvelope />}
            type="email"
            placeholder="e.g. admin@school.com"
            register={form.register("email")}
            error={form.formState.errors.email?.message}
          />

          <Input
            label="Phone Number"
            icon={<FaPhone />}
            placeholder="e.g. +92 300 1234567"
            register={form.register("phoneNumber")}
            error={form.formState.errors.phoneNumber?.message}
          />

          <Input
            label="City"
            icon={<FaMapMarkerAlt />}
            placeholder="e.g. Lahore"
            register={form.register("city")}
            error={form.formState.errors.city?.message}
          />

          <Input
            label="Number of Students (optional)"
            icon={<FaUser />}
            type="number"
            placeholder="e.g. 500"
            register={form.register("numberOfStudents")}
            error={form.formState.errors.numberOfStudents?.message}
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 p-3 rounded-md text-sm">
            Selected Product:{" "}
            <span className="font-semibold text-[#007381]">
              {selectedProductLabel}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={[
              "inline-flex items-center justify-center",
              "bg-[#007381] text-white py-3 px-10 rounded-lg",
              "hover:bg-teal-800 transition disabled:opacity-60",
            ].join(" ")}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="font-bold text-[#007381] hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}

// ---------------- PAGE EXPORT ----------------

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-5xl mx-auto p-6" />}>
      <SignupPageContent />
    </Suspense>
  );
}
