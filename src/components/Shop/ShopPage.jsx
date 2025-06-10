import { useState } from "react";
import ProductList from "./ProductList";
import Pagination from "../../pages/Products/Pagination";
import useFetchProduct from "../../hooks/useFetchProduct";
import FilterSection from "./FilterSection";
import useFetchCategory from "../../hooks/useFetchCategory";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPricRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("")


  const { products, loading, error, totalPage } = useFetchProduct(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    sortOrder
  );
  const categories = useFetchCategory();

  const handlePriceChange = (index, value) => {
    setPricRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

  return (
    <div className="w-11/12 mx-auto">
      <FilterSection
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        categories={categories}
        handleCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        handleSorting={setSortOrder}
      ></FilterSection>
      <ProductList
        products={products}
        loading={loading}
        error={error}
      ></ProductList>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default ShopPage;
