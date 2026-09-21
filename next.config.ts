import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/papergenerator",
        destination: "/paper-generator",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    const privatePaths = [
      "parent",
      "student",
      "tutor",
      "admin",
      "reseller",
      "school-owner",
      "school-teacher",
      "content-manager",
      "login",
      "signup",
      "signupOld",
      "forgotPassword",
      "resetPassword",
      "choose-module",
      "chooseplan",
      "api",
      "schools",
      "sms",
      "papergenerator/demo",
      "resellers/applicationform",
    ];
    return privatePaths.map((path) => ({
      source: `/${path}/:path*`,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, nosnippet" }],
    }));
  },
};

export default nextConfig;
