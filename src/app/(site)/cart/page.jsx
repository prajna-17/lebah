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
      <div className="px-4 mt-8 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          You may also like
        </h2>
      </div>

      <ProductSlider />
      <DeliveryInfo />
    </main>
  );
}
