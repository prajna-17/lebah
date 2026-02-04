import CategoryCard from "./CategoryCard";

export default function CategoryCards() {
  const cards = [
    { title: "Linen", subtitle: "Light & Breathable", img: "/img/linen.jpeg" },
    {
      title: "Giza Cotton",
      subtitle: "Smooth & Elegance",
      img: "/img/giza.jpeg",
    },
    {
      title: "Half Sleeve",
      subtitle: "Casual Elegance",
      img: "/img/halfsleeve.jpeg",
    },
    {
      title: "Corduroy",
      subtitle: "Soft & Textured",
      img: "/img/cordyroy.jpeg",
    },
    {
      title: "French Cuff",
      subtitle: "Sophisticated Style",
      img: "/img/french.jpeg",
    },
    {
      title: "Oxford",
      subtitle: "Timeless & Versatile",
      img: "/img/oxford.jpeg",
    },
  ];

  return (
    <section className="bg-white px-4 py-10">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <CategoryCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
