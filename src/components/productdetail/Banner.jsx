import Link from "next/link";

export default function Banner({ activeTab }) {
  return (
    <section className="w-full mt-10">
      <Link href={`/products?superCategory=${activeTab}`} className="block">
        <img
          src={activeTab === "women" ? "/img/c6.jpeg" : "/img/malebanner.png"}
          alt="Banner"
          className="w-full object-cover cursor-pointer"
        />
      </Link>
    </section>
  );
}
