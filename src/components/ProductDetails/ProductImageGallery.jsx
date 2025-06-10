import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import defaultImage from '../../assets/images/product-item1.png'

const ProductImageGallery = ({images,ProductName}) => {
    const [thumbsSwiper] = useState(null);

    const displayImage = images.length > 0 ? images :[{ image: defaultImage }]
    

  return (
    <div className="rounded-lg border overflow-hidden">
      <Swiper
        navigation
        modules={[Navigation,Thumbs]}
        thumbs={{
            swiper : thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="Product-image-swiper"
      >
        {displayImage.map((imageObj,index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square bg-base-100">
                <img src={imageObj.image} alt={ProductName} className="h-full w-full object-contain"/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
