import { Suspense } from "react";
import ResetPasswordForm from "./resetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
