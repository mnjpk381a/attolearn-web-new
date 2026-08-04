import { Suspense } from "react";
import DemoClient from "./DemoClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <DemoClient />
    </Suspense>
  );
}
