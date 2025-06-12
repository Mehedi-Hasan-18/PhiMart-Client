import { useNavigate } from "react-router";
import DefaultImg from "../../assets/image-not-found-scaled.png";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const handleShowDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <section>
      <div className="card w-80 bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl border border-gray-100">
        <figure className="p-4">
          <img
            className="w-full h-60 object-contain rounded-lg"
            src={
              product.images.length > 0 ? product.images[0].image : DefaultImg
            }
            alt="Book Photo"
          />
        </figure>
        <div className="card-body items-center text-center gap-2">
          <h2 className="card-title text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-xl font-bold text-primary">${product.price}</p>
          <div className="card-actions mt-2 space-x-2">
            {/* <button className="btn btn-outline btn-sm">Buy Now</button> */}
            <button
              onClick={handleShowDetails}
              className="btn btn-outline btn-sm btn-primary"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
