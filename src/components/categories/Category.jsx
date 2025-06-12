import { useEffect, useState } from "react";
import apiClint from "../../services/api-clint";
import CategoryItems from "./CategoryItem";
import { NavLink } from "react-router";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClint.get("/categories").then((res) => setCategories(res.data));
  });

  return (
    <section className="py-16 w-11/12 mx-auto">
      <div className="flex justify-between mb-8">
        <h2 className="text-3xl font-bold">Browse Category</h2>
        <NavLink className="btn btn-secondary text-xl" to={"categories"}>
          View All
        </NavLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {categories.map((category,index) => (
          <CategoryItems
            key={category.id}
            index={index}
            category={category}
          ></CategoryItems>
        ))}
      </div>
    </section>
  );
};

export default Category;
