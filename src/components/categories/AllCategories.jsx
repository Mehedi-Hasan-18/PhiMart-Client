import { useEffect, useState } from "react";
import apiClint from "../../services/api-clint";
import CategoryItems from "./CategoryItem";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClint
      .get("/categories")
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading.....</div>;
  return (
    <section className="py-16 w-11/12 mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2">All Categories</h2>
        <p className="text-gray-500 text-lg">
          Explore a wide range of categories
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <CategoryItems key={category.id} index={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default AllCategories;
