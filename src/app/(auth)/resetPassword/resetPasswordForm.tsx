"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import API from "@/constants/API";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = useMemo(() => searchParams.get("email") || "", [searchParams]);

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const canSubmit =
    token.length > 0 &&
    email.length > 0 &&
    password.length >= 8 &&
    password === confirm &&
    !loading;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setMessage("");

    if (!email) {
      setErrorMessage("Invalid or missing email address.");
      return;
    }

    if (!token) {
      setErrorMessage("Invalid or missing reset password code.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(API.RESET_PWD, {
        email,
        token,
        newPassword: password,
      });

      if (data?.message === "Password has been reset successfully.") {
        setMessage("Password updated successfully.");
        setTimeout(() => router.push("/login"), 1000);
        return;
      }

      setErrorMessage(
        "The email or password reset code you entered is incorrect or has expired. Please request a new code.",
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage(
        "The email or password reset code you entered is incorrect or has expired. Please request a new code.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl bg-white px-6 py-8 text-black shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#007381]">Reset Password</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Check your email for the reset password code, then enter it below
            and create a new password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8">
          <div className="space-y-4 rounded border border-gray-200 p-4 text-black md:p-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                value={email}
                readOnly
                className="w-full rounded border bg-gray-100 px-3 py-2 text-gray-700"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Reset Password Code
              </label>
              <input
                type="text"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                className="w-full rounded border px-3 py-2 focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none"
                placeholder="Reset Password Code"
                autoComplete="one-time-code"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded border px-3 py-2 focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className="w-full rounded border px-3 py-2 focus:border-[#007381] focus:ring-2 focus:ring-[#007381]/20 focus:outline-none"
                placeholder="Re-enter password"
                autoComplete="new-password"
              />
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <FaCircleExclamation className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            {message && (
              <div className="flex items-start gap-2 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                <FaCircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded bg-[#007381] px-4 py-3 font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
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
