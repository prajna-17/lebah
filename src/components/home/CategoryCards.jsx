import CategoryCard from "./CategoryCard";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";

export default function CategoryCards() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : data.data || []);
      });
  }, []);

  return (
    <section className="bg-white px-4 py-10">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard
            key={cat._id}
            id={cat._id}
            title={cat.name}
            subtitle={cat.description || "Explore Collection"}
            img={cat.image || "/img/placeholder.png"}
          />
        ))}
      </div>
    </section>
  );
}
