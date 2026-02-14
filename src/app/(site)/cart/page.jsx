import CartPage from "@/components/cart/CartPage";
import CartSummary from "@/components/cart/CartSummary";
import ProductSlider from "@/components/home/ProductSlider";
import DeliveryInfo from "@/components/productdetail/DeliveryInfo";

export default function CartRoute() {
  return (
    <main>
      <CartPage />
      <CartSummary />

      {/* 👇 Add this */}
      <div className="px-4 mt-10 mb-6 text-center">
        <h2 className="text-2xl font-bold text-[#0f243e]">You May Also Like</h2>

        <div className="flex justify-center mt-2">
          <div className="w-16 h-1 bg-[#0f243e] rounded-full" />
        </div>
      </div>

      <ProductSlider />
      <DeliveryInfo />
    </main>
  );
}
