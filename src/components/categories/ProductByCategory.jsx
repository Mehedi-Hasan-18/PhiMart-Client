import apiClint from "../../services/api-clint";
import ProductItem from "../../pages/Products/ProductItem";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const ProductsByCategory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productRes, categoryRes] = await Promise.all([
          apiClint.get(`/products/?category_id=${id}`),
          apiClint.get(`/categories/${id}`),
        ]);
        setProducts(productRes.data.results);
        setCategory(categoryRes.data);
      } catch (error) {
        console.error("Error fetching category or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading....</div>;
  return (
    <section className="py-16 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-8">
        Products in {category?.name} Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsByCategory;
