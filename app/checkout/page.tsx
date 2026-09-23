import { getOrderRepo, getAuthService } from "@/lib/data";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { Suspense } from "react";

export default async function CheckoutPage() {
  const orderRepo = getOrderRepo();
  const auth = getAuthService();

  const regions = await orderRepo.getRegions();
  const session = await auth.getSession();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
        <CheckoutClient regions={regions} session={session} />
      </Suspense>
    </div>
  );
}
