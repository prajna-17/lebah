"use client";

export default function NewArrivalsBanner({ activeTab }) {
  return (
    <section className="w-full">
      <img
        src={
          activeTab === "women"
            ? "/img/women-newarrival.jpg"
            : "/img/NewArrival.jpg"
        }
        className="w-full h-[178px] object-cover animate-fadeIn"
      />
    </section>
  );
}
