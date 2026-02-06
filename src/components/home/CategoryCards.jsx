import CategoryCard from "./CategoryCard";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";
import LuxuryLoader from "./LuxuryLoader";

export default function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-white px-4 py-10">
      {loading ? (
        <LuxuryLoader />
      ) : (
        <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              id={cat._id}
              title={cat.name}
              subtitle={cat.description || "Explore"}
              img={cat.image || "/img/placeholder.png"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
