import CategoryCard from "./CategoryCard";
import { API } from "@/utils/api";
import { useEffect, useState } from "react";
import LuxuryLoader from "./LuxuryLoader";
import { SUPER_CATEGORY_MAP } from "@/utils/superCategoryMap";

export default function CategoryCards({ activeTab }) {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		console.log("ACTIVE TAB:", activeTab);

		fetch(
			`${API}/categories?superCategory=${SUPER_CATEGORY_MAP[activeTab]}`,
		)
			.then((res) => res.json())
			.then((data) => {
				setCategories(Array.isArray(data) ? data : data.data || []);
				setLoading(false);
			});
	}, [activeTab]);

	return (
		<section className="bg-white px-4 py-6">
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
							superCategory={activeTab}
						/>
					))}
				</div>
			)}
		</section>
	);
}
