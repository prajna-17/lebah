import CartPage from "@/components/cart/CartPage";
import CartSummary from "@/components/cart/CartSummary";
import ProductSlider from "@/components/home/ProductSlider";
import DeliveryInfo from "@/components/productdetail/DeliveryInfo";

export default function CartRoute() {
  return (
    <main>
      <CartPage />
      <CartSummary />
      <ProductSlider />
      <DeliveryInfo />
    </main>
  );
}
