"use client";

import React, { useState } from "react";
import { FaCircleExclamation, FaEye, FaEyeSlash } from "react-icons/fa6";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";
import API from "@/constants/API";
import AppLoader from "@/components/AppLoader";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { useAuthStore } from "@/store/useAuthStore";

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const userTypeRoutes: Record<number, string> = {
  1: "/student",
  2: "/parent",
  3: "/tutor",
  4: "/school-teacher",
  5: "/school-owner",
  6: "/content-manager",
  8: "/admin",
  9: "/reseller",
};

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginSchemaType) => {
    setApiError(null);
    setLoading(true);

    try {
      const response = await axios.post(API.PKUSER_SIGNIN, {
        email: data.email,
        password: data.password,
      });
      if (!response?.data) {
        setApiError("An error occurred. Please try again.");
        return;
      }

      const { user, sessiontoken } = response?.data;
      const redirectPath = userTypeRoutes[user?.typeId];

      if (!redirectPath) {
        toast.error(
          "This web portal is intended for AttoLearn users only. Please use the Attobility Mobile App for personal access.",
        );
        return;
      }

      setAuth(response?.data);

      setCookie("sessionToken", sessiontoken, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      router.replace(redirectPath);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setApiError("Invalid Username/Password.");
        } else {
          setApiError("An error occurred. Please try again.");
        }
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-10 flex items-center justify-center gap-6">
        <div className="mx-auto mb-4 text-center">
          <h1 className="mb-4 text-center text-2xl font-bold text-[#007381] sm:text-3xl">
            Login Form
          </h1>
          <p className="text-sm text-gray-600">
            Enter your credentials to Login.
          </p>
        </div>
      </div>

      {loading && <AppLoader />}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
        <div className="px-2 py-6 text-black sm:px-4">
          <div className="mb-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full rounded border border-[#007381] bg-white px-4 py-3 text-base text-black focus:ring-[#007381] focus:outline-none"
              autoComplete="email"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full rounded border border-[#007381] bg-white px-4 py-3 text-base text-black outline-offset-2 focus:ring-[#007381] focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <a
              href="/forgotPassword"
              className="text-sm text-[#007381] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <Button pendingLabel={"Signing In ..."} buttonLabel={"Sign In"} />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-base font-bold text-[#007381] hover:underline"
              >
                Register
              </a>
            </p>
          </div>

          {apiError && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-red-500">
              <FaCircleExclamation className="h-5 w-5" />
              <p className="text-center">{apiError}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
