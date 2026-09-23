import { getOrderRepo } from "@/lib/data";
import { CartSummaryClient } from "@/components/orders/CartSummaryClient";

export default async function OrderSummaryPage() {
  const orderRepo = getOrderRepo();
  const regions = await orderRepo.getRegions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CartSummaryClient regions={regions} />
    </div>
  );
}
