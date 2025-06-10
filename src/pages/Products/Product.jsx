import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import apiClint from "../../services/api-clint";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { NavLink } from "react-router";
import ErrorAlret from "../../components/ErrorAlret";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    apiClint
      .get("/products/")
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="mx-auto py-16 bg-gray-50">
      <div className="flex justify-between w-11/12 mx-auto">
        <h2 className="text-3xl font-bold">Trending Books</h2>
        <NavLink className="btn btn-secondary text-xl" to={"#"}>
          View All
        </NavLink>
      </div>

      {/* Spiner */}
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-xl text-2xl"></span>
        </div>
      )}
      {/* Error */}
      {error && <ErrorAlret error={error} />}

      {/* Product Section */}
      {!loading &&
        !error &&
        products.length >0 && (
            <Swiper
              modules={[Navigation]}
              speaceBetween={10}
              slidePreview={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              navigation
              className="mt-5 mb-5 px-5 ml-5 container"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductItem key={product.id} product={product}></ProductItem>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
      {!loading && !error && products.length === 0 &&  (
        <p className="text-2xl flex justify-center text-red-500">
          No Product AvailAvail
        </p>
      )}
    </section>
  );
};

export default Product;
