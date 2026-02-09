// utils/wishlist.js
import { getUserIdFromToken } from "./auth";
// NOTE: Multi-user testing requires production email domain.
// Logic is userId-based and production-safe.

const getWishlistKey = () => {
  const userId = getUserIdFromToken();
  return userId ? `wishlist_${userId}` : "wishlist_guest";
};

export const getWishlist = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(getWishlistKey())) || [];
};

export const addToWishlistIfNotExists = (item) => {
  const wishlist = getWishlist();

  if (wishlist.some((w) => w.variantId === item.variantId)) return;

  wishlist.push(item);
  localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlist-updated"));
};

export const removeFromWishlist = (variantId) => {
  const wishlist = getWishlist().filter((item) => item.variantId !== variantId);

  localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlist-updated"));
};

export const toggleWishlist = (item) => {
  const wishlist = getWishlist();

  const index = wishlist.findIndex((w) => w.variantId === item.variantId);

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push({
      variantId: item.variantId,
      productId: item.productId || item.id,

      title: item.title, // ✅ FIXED
      image: item.image,

      price: item.price,
      oldPrice: item.oldPrice, // ✅ FIXED
      discount: item.discount,

      color: item.color,
      size: item.size, // 🔥 THIS WAS MISSING
    });
  }

  localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlist-updated"));
};

export const isInWishlist = (variantId) => {
  return getWishlist().some((item) => item.variantId === variantId);
};

export const clearWishlist = () => {
  localStorage.removeItem(getWishlistKey());
  window.dispatchEvent(new Event("wishlist-updated"));
};
