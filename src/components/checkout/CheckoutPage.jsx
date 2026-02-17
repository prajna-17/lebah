"use client";

import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import { MapPin, Percent, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAddress } from "@/context/AddressContext";
import { getCart, clearCart } from "@/utils/cart";
import { API } from "@/utils/api";

export default function CheckoutPage() {
  const [openSummary, setOpenSummary] = useState(false);
  const [showAddressError, setShowAddressError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const router = useRouter();
  const { address } = useAddress();
  const [cart, setCart] = useState([]);
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  let discountPercentage = 0;

  if (totalQty === 2) discountPercentage = 5;
  else if (totalQty === 3) discountPercentage = 10;
  else if (totalQty >= 4) discountPercentage = 15;

  const discount = Math.round((subTotal * discountPercentage) / 100);

  const tax = 0;
  const grandTotal = subTotal - discount;

  const today = new Date();

  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const startDate = addDays(today, 7);
  const endDate = addDays(today, 10);

  const arrivalText = `${formatDate(startDate)} to ${formatDate(endDate)}`;
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    const load = () => setCart(getCart());
    load();

    window.addEventListener("cart-updated", load);
    return () => window.removeEventListener("cart-updated", load);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      {/* <div className="bg-[#0f1e3a] text-white py-4 flex items-center justify-center relative">
        <FiChevronLeft className="absolute left-4 text-xl" />
        <h1 className="text-lg font-semibold">Lebah</h1>
      </div> */}

      <div className="px-4 py-6 space-y-6 pb-40">
        <FiChevronLeft className="absolute left-4 text-xl" />

        <h2 className="text-xl font-semibold text-center">CHECKOUT</h2>

        {/* SHIPPING */}
        {/* SHIPPING */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping</h3>

          {/* ADD ADDRESS */}
          {address ? (
            <div className="bg-white rounded-2xl p-4 shadow">
              <div className="flex justify-between items-start">
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{address.name}</p>
                  <p>{address.email}</p>
                  <p>{address.phone}</p>
                  <p className="mt-2">
                    {address.line1}
                    <br />
                    {address.city} - {address.pincode}
                  </p>
                </div>

                <button
                  onClick={() => router.push("/add-address")}
                  className="text-sm font-medium text-[#0f1e3a]"
                >
                  Add / Edit
                </button>
              </div>

              <label className="flex items-center gap-2 mt-3 text-sm">
                <input type="checkbox" defaultChecked />
                Billing and delivery addresses are same.
              </label>
            </div>
          ) : (
            <div
              onClick={() => router.push("/add-address")}
              className="bg-white rounded-2xl px-5 py-5 flex items-center justify-between shadow cursor-pointer"
            >
              <span className="font-semibold">Add Address</span>
              <FiChevronRight />
            </div>
          )}

          {/* OFFERS */}
          <div
            onClick={() => setShowOfferModal(true)}
            className="bg-white rounded-2xl px-5 py-5 flex items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0f1e3a]/10 flex items-center justify-center">
                <Percent className="text-[#0f1e3a] text-xl" />
              </div>
              <span className="text-base font-semibold">Offers</span>
            </div>
            <FiChevronRight className="text-2xl text-gray-700" />
          </div>
        </div>

        {/* CARDS */}
        {/* <div className="space-y-4"> */}
        {/* <h3 className="text-lg font-semibold">Credit & Debit Cards</h3> */}

        {/* <div className="bg-white rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,0,0,0.15)] space-y-3"> */}
        {/* CARD 1 */}
        {/* <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/img/mastercard.png"
                  className="h-6"
                  alt="mastercard"
                />
                <span className="text-sm text-gray-700">
                  Mastercard **** **** **** 1234
                </span>
              </div>
              <input type="radio" name="card" />
            </div> */}

        {/* CARD 2 */}
        {/* <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/visa.png" className="h-5" alt="visa" />
                <span className="text-sm text-gray-700">
                  Mastercard **** **** **** 1234
                </span>
              </div>
              <input type="radio" name="card" />
            </div> */}

        {/* ADD CARD */}
        {/* <div className="flex items-center gap-4 px-1 py-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-xl">
                +
              </div>
              <span className="text-sm font-medium text-gray-600">
                Add New Card
              </span>
            </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* UPI */}
        {/* <div className="space-y-4"> */}
        {/* <h3 className="text-lg font-semibold">UPI</h3> */}

        {/* <div className="bg-white rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,0,0,0.15)] space-y-3"> */}
        {/* GOOGLE PAY */}
        {/* <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/gpay.png" className="h-6" alt="gpay" />
                <span className="text-sm text-gray-700">Google pay</span>
              </div>
              <input type="radio" name="upi" />
            </div> */}

        {/* PHONEPE */}
        {/* <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
              <div className="flex items-center gap-3">
                <img src="/img/phonepe.png" className="h-6" alt="phonepe" />
                <span className="text-sm text-gray-700">PhonePe</span>
              </div>
              <input type="radio" name="upi" />
            </div> */}

        {/* ADD UPI */}
        {/* <div className="flex items-center gap-4 px-1 py-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-xl">
                +
              </div>
              <span className="text-sm font-medium text-gray-600">
                Add New UPI ID
              </span>
            </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* MORE OPTIONS */}
        <div className="space-y-3">
          {/* COD */}
          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
            <div className="flex items-center gap-3">
              <img src="/img/cod.png" className="h-6" alt="cod" />
              <span className="text-sm text-gray-700">Cash On Delivery</span>
            </div>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
          </div>

          {/* ONLINE PAYMENT */}
          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-4">
            <div className="flex items-center gap-3">
              {/* <img src="/img/upi.png" className="h-6" alt="online" /> */}
              <span className="text-sm text-gray-700">
                Online Payment (UPI / Card)
              </span>
            </div>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "ONLINE"}
              onChange={() => setPaymentMethod("ONLINE")}
            />
          </div>
        </div>

        {/* ITEMS */}
        {/* ITEMS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{cart.length} Items</span>
            <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
              Arrives by {arrivalText}
            </span>
          </div>

          {/* SLIDER */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {cart.map((item) => (
              <div
                key={item.variantId}
                className="min-w-[320px] bg-gray-200 rounded-2xl p-4 flex gap-4"
              >
                <img
                  src={item.image}
                  className="w-24 h-28 rounded-xl object-cover"
                  alt={item.title}
                />

                <div className="text-sm space-y-1">
                  <p className="font-semibold">{item.title}</p>
                  <p>Color : {item.color}</p>
                  {item.size && <p>Size : {item.size}</p>}
                  <p className="font-semibold mt-2">
                    ₹ {(item.price * item.qty).toLocaleString("en-IN")}
                  </p>
                  <p>Qty : {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        {/* ORDER SUMMARY */}
        {openSummary && (
          <div className="px-4 py-4 space-y-3 border-b font-semibold">
            <div className="flex justify-between text-sm">
              <span>Sub Total</span>
              <span>₹ {subTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>- ₹ {discount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>₹ {tax.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Grand Total</span>
              <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}

        {/* PAY BAR */}
        <div className="flex items-center justify-between px-4 py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenSummary(!openSummary)}
          >
            {openSummary ? <FiChevronDown /> : <FiChevronUp />}
            <div>
              <p className="text-medium text-gray-900 font-bold">Total</p>
              <p className="text-xl font-bold">
                ₹ {grandTotal.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <button
            onClick={async () => {
              if (!address) {
                setShowAddressError(true);
                if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
                setTimeout(() => setShowAddressError(false), 2500);
                return;
              }

              const token = localStorage.getItem("lebah-token");
              if (!token) {
                alert("Please login to place order");
                return;
              }

              const products = cart.map((item) => ({
                product: item.productId,
                quantity: item.qty,
              }));

              const shippingAddress = {
                fullName: address.name,
                phone: address.phone,
                addressLine: address.line1,
                landmark: address.landmark || "",
                city: address.city,
                state: address.state || "",
                postalCode: address.pincode,
              };

              try {
                if (paymentMethod === "COD") {
                  const res = await fetch(`${API}/orders/create-cod`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ products, shippingAddress }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    alert(data.message || "Order failed");
                    return;
                  }

                  localStorage.setItem(
                    "lastOrder",
                    JSON.stringify({
                      orderNumber: data.data.orderId,
                      items: cart,
                      subTotal,
                      discount,
                      tax,
                      grandTotal,
                      arrivalText,
                      paymentMethod: "COD",
                    }),
                  );

                  clearCart();
                  window.dispatchEvent(new Event("cart-updated"));
                  router.push("/order-confirmed");
                } else {
                  const orderRes = await fetch(`${API}/razorpay/create-order`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount: grandTotal }),
                  });

                  const orderData = await orderRes.json();

                  if (!orderRes.ok || !orderData.success) {
                    alert("Failed to initiate payment");
                    return;
                  }

                  const { order } = orderData;
                  console.log(
                    "Razorpay Key:",
                    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                  );
                  console.log("Order ID:", order.id);
                  console.log("Amount:", order.amount);

                  const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: order.amount,
                    currency: "INR",
                    name: "Lebah",
                    description: "Order Payment",
                    order_id: order.id,
                    handler: function () {
                      alert("Payment Successful 🎉");

                      clearCart();
                      window.dispatchEvent(new Event("cart-updated"));
                      router.push("/order-confirmed");
                    },
                    prefill: {
                      name: address.name,
                      email: address.email,
                      contact: address.phone,
                    },
                    theme: {
                      color: "#0f1e3a",
                    },
                  };

                  const rzp = new window.Razorpay(options);
                  rzp.open();
                }
              } catch (err) {
                alert("Something went wrong. Please try again.");
              }
            }}
            className="bg-[#0f1e3a] text-white px-8 py-4 rounded-lg font-bold"
          >
            PAY NOW
          </button>
        </div>
      </div>
      {showAddressError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0b1b2f] text-white px-5 py-3 rounded-xl shadow-lg animate-fadeIn">
          Please add your delivery address to continue
        </div>
      )}

      {showOfferModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-lg font-semibold mb-4">Combo Offer</h3>
            <p className="mb-2">Buy 2 items → 5% OFF</p>
            <p className="mb-2">Buy 3 items → 10% OFF</p>
            <p className="mb-2">Buy 4+ items → 15% OFF</p>
            <p className="text-sm text-gray-500 mt-3">
              Discount is applied automatically at checkout.
            </p>

            <button
              onClick={() => setShowOfferModal(false)}
              className="mt-5 bg-[#0f1e3a] text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="bg-white rounded-xl shadow divide-y">{children}</div>
    </div>
  );
}

function Row({ label, arrow }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-sm font-medium">{label}</span>
      {arrow && <FiChevronRight />}
    </div>
  );
}

function RadioRow({ label }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="text-sm font-medium">{label}</span>
      <input type="radio" name="payment" />
    </div>
  );
}

function AddRow({ label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-4 text-gray-600">
      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
        <FiPlus />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
