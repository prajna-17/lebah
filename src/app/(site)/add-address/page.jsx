"use client";

import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAddress } from "@/context/AddressContext";

export default function AddAddressPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    city: "",
    pincode: "",
    state: "",
  });

  const router = useRouter();
  const { address, setAddress } = useAddress();

  /* PREFILL FORM IF ADDRESS EXISTS */
  useEffect(() => {
    if (address) {
      setForm({
        name: address.name || "",
        email: address.email || "",
        phone: address.phone || "",
        line1: address.line1 || "",
        city: address.city || "",
        pincode: address.pincode || "",
        state: address.state || "",
      });
    }
  }, [address]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* TOP BAR */}
      <div className="px-4 py-4 flex items-center">
        <FiChevronLeft
          className="text-2xl cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="flex-1 text-center text-lg font-semibold">
          ADD ADDRESS
        </h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* CONTACT DETAILS */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Details</h2>

          <Input
            label="Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter your name"
          />

          <Input
            label="Email ID *"
            placeholder="Enter your email Id"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="flex gap-3">
            <div className="w-24">
              <label className="text-sm font-medium">Code *</label>
              <select className="w-full mt-1 border border-gray-300 rounded-md px-3 py-3">
                <option>+91</option>
              </select>
            </div>

            <div className="flex-1">
              <Input
                label="Contact Number *"
                placeholder="Enter your Mobile Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* ADDRESS DETAILS */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Address Details</h2>

          <div className="flex gap-3">
            <div className="w-24">
              <label className="text-sm font-medium">Country *</label>
              <select className="w-full mt-1 border border-gray-300 rounded-md px-3 py-3">
                <option>IN</option>
              </select>
            </div>

            <div className="flex-1">
              <Input
                label="Pincode *"
                placeholder="Enter your pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              />
            </div>
          </div>

          <Input
            label="City *"
            placeholder="Enter your city name"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <Input
            label="State *"
            placeholder="Enter your state name"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />

          <Input
            label="Details *"
            placeholder="Address ( House No., Building, Street, Area )"
            value={form.line1}
            onChange={(e) => setForm({ ...form, line1: e.target.value })}
          />

          <input
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm"
            placeholder="Locality / Town"
          />
        </section>

        {/* SAVE ADDRESS AS */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Save Address As</h2>

          <div className="flex gap-4">
            <Tag label="Home" active />
            <Tag label="Work" />
            <Tag label="Other" />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked />
            Make this address default
          </label>
        </section>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 pt-4">
          <button
            className="flex-1 border border-gray-400 py-3 font-medium"
            onClick={() => router.back()}
          >
            CANCEL
          </button>

          <button
            className="flex-1 bg-[#0f1e3a] text-white py-3 font-medium"
            onClick={() => {
              setAddress(form);
              router.push("/checkout");
            }}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */

function Input({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full mt-1 border border-gray-300 rounded-md px-4 py-3 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

function Tag({ label, active }) {
  return (
    <button
      className={`px-6 py-2 rounded-full border text-sm font-medium ${
        active
          ? "border-[#0f1e3a] text-[#0f1e3a]"
          : "border-gray-300 text-gray-400"
      }`}
    >
      {label}
    </button>
  );
}
