import { Link } from 'react-router';
import bgimg from '../../assets/images/banner-image-bg-2.jpg'
import image from '../../assets/images/banner-image3.png'
import DiscountTimer from './DiscountTimer';

const DiscountSection = () => {
  return (
    <section
      className="w-full h-[480px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="container w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full sm:w-2/3 md:max-w-md drop-shadow-lg"
            src={image}
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
            30% Discount On All Item. Hurry Up!!
          </h1>

          {/* CountDown Section */}
          <DiscountTimer></DiscountTimer>
          <Link to={'products'} className="btn btn-secondary rounded-2xl text-xl mt-5">
            Shop Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
