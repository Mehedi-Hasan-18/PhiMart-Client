import ProductItem from "../../pages/Products/ProductItem";
import ErrorAlret from "../ErrorAlret";

const ProductList = ({ products, loading ,error}) => {
  if (loading)
    return (
      <div className="flex justify-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-2xl"></span>
      </div>
    );
    if(error) return(
        <ErrorAlret error={error} />
    )
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 mx-auto mt-10 mb-10">
      {products.map((product) => (
        <ProductItem key={product.id} product={product}></ProductItem>
      ))}
    </div>
  );
};

export default ProductList;
