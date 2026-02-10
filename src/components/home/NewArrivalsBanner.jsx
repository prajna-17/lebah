"use client";

export default function NewArrivalsBanner({ activeTab }) {
  return (
    <section className="w-full">
      <img
        src={activeTab === "women" ? "/img/new.jpeg" : "/img/NewArrival.jpg"}
        className="w-full h-[120px] object-cover animate-fadeIn"
      />
    </section>
  );
}
