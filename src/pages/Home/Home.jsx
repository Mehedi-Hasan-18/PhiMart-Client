import Category from "../../components/categories/Category";
import DiscountSection from "../../components/Discount/DiscountSection";
import Feature from "../../components/Feature";
import Product from "../Products/Product";
import Hero from "./Hero";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Feature></Feature>
            <Category></Category>
            <Product></Product>
            <DiscountSection></DiscountSection>
        </div>
    );
};

export default Home;