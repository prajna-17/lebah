import CartPage from "@/components/cart/CartPage";
import CartSummary from "@/components/cart/CartSummary";
import DeliveryInfo from "@/components/productdetail/DeliveryInfo";

export default function CartRoute() {
  return (
    <main>
      <CartPage />
      <DeliveryInfo />
      <CartSummary />
    </main>
  );
}
