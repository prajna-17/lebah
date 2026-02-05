// utils/cart.js
import getDiscount from "./getDiscount";
import { getUserIdFromToken } from "./auth";

// NOTE: Multi-user testing requires production email domain.
// Logic is userId-based and production-safe.

const getCartKey = () => {
  const userId = getUserIdFromToken();
  return userId ? `cart_${userId}` : "cart_guest";
};

export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
};

export const addToCart = (product) => {
  const cart = getCart();

  const variantId =
    product.variantId ||
    `${product.productId || product.id}-${product.color || "Default"}`;

  const discount = getDiscount(product.price, product.mrp || product.oldPrice);

  const existing = cart.find((item) => item.variantId === variantId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      variantId,
      qty: 1,
      discount,
    });
  }

  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const updateQty = (variantId, qty) => {
  const cart = getCart().map((item) =>
    item.variantId === variantId ? { ...item, qty } : item,
  );

  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const removeFromCart = (variantId) => {
  const cart = getCart().filter((item) => item.variantId !== variantId);

  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const clearCart = () => {
  localStorage.removeItem(getCartKey());
  window.dispatchEvent(new Event("cart-updated"));
};
