"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaGlobe,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import API from "@/constants/API";

const SignupSchema = z
  .object({
    role: z.enum(["tutor", "parent", "content-manager"], {
      message: "Please select an account type",
    }),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    gender: z.string().min(1, "Gender is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    webUrl: z.string().optional(),
    consent: z.boolean().refine((value) => value === true, {
      message: "You must agree to the Terms and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignupFormType = z.infer<typeof SignupSchema>;

type SignupUser = {
  userTypeName: "Parent" | "Tutor" | "ContentManager";
  firstName: string;
  lastName?: string;
  email: string;
  mobileNumber?: string;
  gender?: string;
  country?: string;
  password: string;
  verificationCode?: string;
  profileImageUrl?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
};

type VerificationData = {
  email?: string;
  message?: string;
};

function InputField({
  label,
  icon,
  register,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  icon: React.ReactNode;
  register: UseFormRegisterReturn;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#007381]">
        {label}
      </label>
      <div className="relative">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-[#007381]">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register}
          className={[
            "w-full rounded border bg-white py-3 pr-4 pl-10 text-[#007381]",
            "focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none",
            error ? "border-red-400" : "border-gray-300",
          ].join(" ")}
        />
      </div>
      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default function AuthSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [detectingCountry, setDetectingCountry] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pendingUser, setPendingUser] = useState<SignupUser | null>(null);
  const [verificationData, setVerificationData] =
    useState<VerificationData | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      role: "parent",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      webUrl: "",
      consent: false,
    },
    mode: "onTouched",
  });

  const selectedRole = form.watch("role");

  useEffect(() => {
    let cancelled = false;

    async function detectCountry() {
      try {
        const response = await fetch("/api/geo/country", {
          cache: "no-store",
        });
        const data = await response.json();
        const country = data?.country || "";

        if (!cancelled && country) {
          form.setValue("country", country, { shouldValidate: true });
        }
      } catch {
        // Users can still enter the country manually if IP lookup fails.
      } finally {
        if (!cancelled) setDetectingCountry(false);
      }
    }

    void detectCountry();

    return () => {
      cancelled = true;
    };
  }, [form]);

  const buildUser = (data: SignupFormType): SignupUser => ({
    userTypeName:
      data.role === "tutor"
        ? "Tutor"
        : data.role === "content-manager"
          ? "ContentManager"
          : "Parent",
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    mobileNumber: data.phoneNumber,
    gender: data.gender,
    country: data.country,
    password: data.password,
    profileImageUrl: "",
    isEmailVerified: false,
    isActive: true,
  });

  const sendVerificationCode = async (user: SignupUser) => {
    try {
      setLoading(true);
      setVerificationError("");
      const response = await axios.post(API.MSSQL_USERS_CONFIRM, {
        email: user.email,
      });

      if (response?.data) {
        setPendingUser(user);
        setVerificationData(response.data);
        setVerificationCode("");
        toast.success("Verification code sent to your email.");
        return;
      }

      toast.error("Could not send verification code. Please try again.");
    } catch (error) {
      console.error("Email verification error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Could not send verification code. Please try again.",
        );
      } else {
        toast.error("Could not send verification code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SignupFormType) => {
    await sendVerificationCode(buildUser(data));
  };

  const handleConfirmSignup = async () => {
    setVerificationError("");

    if (!pendingUser || !verificationData) {
      setVerificationError("Signup details are missing. Please try again.");
      return;
    }

    if (!verificationCode.trim()) {
      setVerificationError("Verification code is required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API.PKUSER_SIGNUP_MULTI_STEP, {
        ...pendingUser,
        verificationCode: verificationCode.trim(),
      });

      if (response?.data) {
        toast.success("Email verified. Registration completed successfully.");
        router.push("/login");
        return;
      }

      toast.error("Registration failed. Please try again.");
    } catch (error) {
      console.error("Registration error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup failed.");
      } else {
        toast.error("Signup failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (pendingUser && verificationData) {
    return (
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-white p-6 text-black shadow-md sm:p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#007381] uppercase">
              Email Verification
            </p>
            <h1 className="mt-3 text-2xl font-bold text-[#007381] sm:text-3xl">
              Check your email
            </h1>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              We sent a verification code to{" "}
              <span className="font-semibold text-gray-900">
                {pendingUser.email}
              </span>
              . Enter it below to complete your account registration.
            </p>
          </div>

          <div className="space-y-5 rounded bg-gray-50 p-4 md:p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#007381]">
                Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
                placeholder="Enter verification code"
                autoComplete="one-time-code"
                className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-[#007381] focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none"
              />
              {verificationError ? (
                <p className="mt-2 text-sm text-red-500">{verificationError}</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={handleConfirmSignup}
              disabled={loading}
              className="w-full rounded bg-[#007381] py-3 text-lg font-bold text-white transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-teal-400"
            >
              {loading ? "Creating Account ..." : "Verify & Create Account"}
            </button>

            <button
              type="button"
              onClick={() => sendVerificationCode(pendingUser)}
              disabled={loading}
              className="w-full rounded border border-[#007381] py-3 text-sm font-semibold text-[#007381] transition hover:bg-[#007381]/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Resend Verification Code
            </button>

            <button
              type="button"
              onClick={() => {
                setPendingUser(null);
                setVerificationData(null);
                setVerificationCode("");
                setVerificationError("");
              }}
              disabled={loading}
              className="w-full py-2 text-sm font-semibold text-gray-500 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Edit signup details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-2xl bg-white p-6 text-black shadow-md sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#007381] uppercase">
            Welcome to AttoLearn
          </p>
          <h1 className="mt-3 text-2xl font-bold text-[#007381] sm:text-3xl">
            Create Account
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Parents and tutors can register themselves here.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-[#007381]">
              Account Type
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "parent", label: "Parent" },
                { value: "tutor", label: "Tutor" },
                { value: "content-manager", label: "Content Manager" },
              ].map((role) => (
                <label
                  key={role.value}
                  className={`cursor-pointer rounded-lg border p-2 transition ${
                    selectedRole === role.value
                      ? "border-[#007381] bg-[#007381]/10"
                      : "border-gray-200 bg-white hover:border-[#007381]/40"
                  }`}
                >
                  <input
                    type="radio"
                    value={role.value}
                    className="sr-only"
                    {...form.register("role")}
                  />
                  <span className="font-semibold text-gray-950">
                    {role.label}
                  </span>
                  {/* <span className="mt-1 block text-xs text-gray-500">
                    Type ID:{" "}
                    {role.value === "tutor" ? TUTOR_TYPE_ID : PARENT_TYPE_ID}
                  </span> */}
                </label>
              ))}
            </div>
            {form.formState.errors.role?.message ? (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.role.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="First Name"
              icon={<FaUser />}
              placeholder="First name"
              autoComplete="given-name"
              register={form.register("firstName")}
              error={form.formState.errors.firstName?.message}
            />

            <InputField
              label="Last Name"
              icon={<FaUser />}
              placeholder="Last name"
              autoComplete="family-name"
              register={form.register("lastName")}
              error={form.formState.errors.lastName?.message}
            />

            <InputField
              label="Phone Number"
              icon={<FaPhone />}
              placeholder="+92 300 1234567"
              autoComplete="tel"
              register={form.register("phoneNumber")}
              error={form.formState.errors.phoneNumber?.message}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-[#007381]">
                Country
              </label>
              <div className="relative">
                <FaGlobe className="absolute top-1/2 left-3 -translate-y-1/2 text-[#007381]" />
                <input
                  placeholder={
                    detectingCountry ? "Detecting from IP..." : "Country"
                  }
                  {...form.register("country")}
                  className={[
                    "w-full rounded border bg-white py-3 pr-4 pl-10 text-[#007381]",
                    "focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none",
                    form.formState.errors.country
                      ? "border-red-400"
                      : "border-gray-300",
                  ].join(" ")}
                />
              </div>
              {form.formState.errors.country?.message ? (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.country.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#007381]">
                Gender
              </label>
              <select
                {...form.register("gender")}
                className={[
                  "w-full rounded border bg-white px-4 py-3 text-[#007381]",
                  "focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none",
                  form.formState.errors.gender
                    ? "border-red-400"
                    : "border-gray-300",
                ].join(" ")}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {form.formState.errors.gender?.message ? (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.gender.message}
                </p>
              ) : null}
            </div>

            {/* <InputField
              label="Website URL (optional)"
              icon={<FaGlobe />}
              placeholder="https://example.com"
              register={form.register("webUrl")}
              error={form.formState.errors.webUrl?.message}
            /> */}

            <InputField
              label="Email"
              icon={<FaEnvelope />}
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              register={form.register("email")}
              error={form.formState.errors.email?.message}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-[#007381]">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#007381]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  {...form.register("password")}
                  className={[
                    "w-full rounded border bg-white py-3 pr-12 pl-10 text-[#007381]",
                    "focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none",
                    form.formState.errors.password
                      ? "border-red-400"
                      : "border-gray-300",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#007381]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {form.formState.errors.password?.message ? (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#007381]">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#007381]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  {...form.register("confirmPassword")}
                  className={[
                    "w-full rounded border bg-white py-3 pr-12 pl-10 text-[#007381]",
                    "focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none",
                    form.formState.errors.confirmPassword
                      ? "border-red-400"
                      : "border-gray-300",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#007381]"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {form.formState.errors.confirmPassword?.message ? (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              {...form.register("consent")}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#007381] focus:ring-[#007381]"
            />
            <span>
              I agree to the{" "}
              <a
                href="https://attolearn.com/termsofservice"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#007381] hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://attolearn.com/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#007381] hover:underline"
              >
                Privacy Policy
              </a>
              .
              {form.formState.errors.consent?.message ? (
                <span className="mt-1 block text-red-500">
                  {form.formState.errors.consent.message}
                </span>
              ) : null}
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#007381] py-3 text-lg font-bold text-white transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-teal-400"
          >
            {loading ? "Creating Account ..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-bold text-[#007381] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
