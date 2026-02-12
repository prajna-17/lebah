"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ProductMeta({ product }) {
  const [openIndex, setOpenIndex] = useState(null);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "PRODUCT DETAILS",
      content: (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{product.description}</p>

          <div className="mt-4 space-y-1">
            <p>
              <span className="font-semibold">Price:</span> ₹ {product.price}
            </p>

            {product.oldPrice && (
              <p>
                <span className="font-semibold">Old Price:</span>{" "}
                <span className="line-through text-gray-400">
                  ₹ {product.oldPrice}
                </span>
              </p>
            )}

            {discount > 0 && (
              <p className="text-green-600 font-medium">
                {discount}% Discount Applied
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "MANUFACTURING INFORMATION",
      content: (
        <div className="text-sm leading-relaxed space-y-2">
          <p>
            <strong>Manufactured By:</strong> Lebah Fashion Pvt. Ltd.
          </p>
          <p>
            <strong>Country of Origin:</strong> India
          </p>
          <p>
            <strong>Fabric Type:</strong> Premium Cotton Blend
          </p>
          <p>
            <strong>Care Instructions:</strong> Machine wash cold, do not
            bleach.
          </p>
          <p>
            <strong>Packed By:</strong> Lebah Warehouse, Bengaluru
          </p>
        </div>
      ),
    },
    {
      title: "RETURN & EXCHANGE POLICY",
      content: (
        <div className="text-sm leading-relaxed space-y-3">
          <p>
            Returns or exchanges are accepted within <strong>3 days</strong>{" "}
            from the date of delivery.
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Item must be unused and in original condition.</li>
            <li>Original packaging must be intact.</li>
            <li>Sale items may not be eligible for return.</li>
            <li>
              Only defective or damaged products are eligible for exchange.
            </li>
          </ul>
          <p>
            Orders are shipped within <strong>6 days</strong> via registered
            courier services.
          </p>
        </div>
      ),
    },
    {
      title: "FAQ's",
      content: (
        <div className="text-sm leading-relaxed space-y-3">
          <p>
            <strong>Q: How do I choose the correct size?</strong>
          </p>
          <p>A: Please refer to the size chart provided above.</p>

          <p>
            <strong>Q: How long does delivery take?</strong>
          </p>
          <p>A: Orders are delivered within 5–7 business days.</p>

          <p>
            <strong>Q: Is Cash on Delivery available?</strong>
          </p>
          <p>A: Yes, COD is available on eligible locations.</p>

          <p>
            <strong>Q: Can I cancel my order?</strong>
          </p>
          <p>A: Orders can be cancelled before dispatch.</p>
        </div>
      ),
    },
  ];

  return (
    <section className="px-4 mt-20 text-gray-900">
      <div className="space-y-3">
        {sections.map((section, index) => (
          <div
            key={index}
            className=" overflow-hidden transition-all duration-300 bg-white shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold tracking-wide"
            >
              {section.title}
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`px-5 overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-[500px] py-4 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
