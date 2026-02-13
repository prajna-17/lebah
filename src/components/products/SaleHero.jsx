export default function SaleHero({ superCategory }) {
  return (
    <section className="w-full mt-0.2 h-[130px]">
      <img
        src={superCategory === "women" ? "/img/c6.jpeg" : "/img/flat.png"}
        alt="Sale Banner"
        className="w-full h-full object-cover"
      />
    </section>
  );
}
