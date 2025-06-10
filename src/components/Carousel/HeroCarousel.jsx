// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CarouselSlide from './CarouselSlide';
import book1 from "../../assets/images/banner-image1.png";
import book2 from "../../assets/images/banner-image2.png";
import book3 from "../../assets/images/banner-image.png";
import bgimg1 from '../../assets/images/banner-image-bg-1.jpg'
import bgimg2 from '../../assets/images/banner-image-bg-2.jpg'
import bgimg3 from '../../assets/images/banner-image-bg.jpg'

const HeroCarousel = () => {
    const slides = [
        {
            title : 'How Innovation Works by Matt Ridley',
            subtitle : 'Awesome Deal 30% Off. Grab It Now',
            image : book1,
            bgimg : bgimg1
        },
        {
            title : 'The Fine Art Book By Lauren Asher',
            subtitle : 'Awesome Deal 30% Off. Grab It Now',
            image : book2,
            bgimg : bgimg3
        },
        {
            title : 'Your Heart In The Sea By Nikita Gill',
            subtitle : 'Awesome Deal 30% Off. Grab It Now',
            image : book3,
            bgimg : bgimg2
        }
    ]

  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map(slide => <SwiperSlide key={slide.index}><CarouselSlide title={slide.title} subtitle={slide.subtitle} image={slide.image} bgimg={slide.bgimg}></CarouselSlide></SwiperSlide>)}
      </Swiper>
    </>
  );
}
export default HeroCarousel
