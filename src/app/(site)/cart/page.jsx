import CartPage from "@/components/cart/CartPage";
import CartSummary from "@/components/cart/CartSummary";
import DeliveryInfo from "@/components/productdetail/DeliveryInfo";
import RelatedProducts from "@/components/productdetail/RelatedProducts";

export default function CartRoute() {
  return (
    <main>
      <CartPage />
      <DeliveryInfo />
      <CartSummary />
      <RelatedProducts />
    </main>
  );
}
