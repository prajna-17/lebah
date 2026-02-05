import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-gray-500">Loading products…</div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
