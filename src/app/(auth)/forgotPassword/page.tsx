"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaCircleExclamation, FaEnvelope } from "react-icons/fa6";
import API from "@/constants/API";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API.SEND_PWD}?email=${encodeURIComponent(email.trim())}`,
      );

      if (response?.data) {
        toast.success(
          response.data?.message === "The password reset code has been sent."
            ? "We sent a password reset code to your email."
            : String(response.data?.message || "Reset code sent."),
        );
      }

      router.push(`/resetPassword?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      console.error("Error sending reset password code:", error);
      setErrorMessage("Email is wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl bg-white px-6 py-8 text-black shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#007381]">
            Forgot your password?
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Enter the email address associated with your account. We will send
            you a password reset code.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8">
          <div className="rounded bg-gray-50 p-4 text-black md:p-6">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-[#007381]" />
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
                required
                autoComplete="email"
                className="w-full rounded border border-gray-300 bg-white py-3 pr-4 pl-10 text-[#007381] focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 mb-4 w-full rounded bg-[#007381] py-3 text-lg font-bold text-white transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-teal-400"
            >
              {loading ? "Sending Code ..." : "Send Reset Password Code"}
            </button>

            {errorMessage && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-500">
                <FaCircleExclamation className="h-5 w-5" />
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </form>

        <div className="flex items-center justify-between p-4">
          <a href="/login" className="font-bold text-[#007381] hover:underline">
            Login
          </a>
          <a
            href="/signup"
            className="text-lg font-bold text-[#007381] hover:underline"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
