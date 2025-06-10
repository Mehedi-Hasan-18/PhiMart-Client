const CarouselSlide = ({ title, subtitle, image, bgimg }) => {
  return (
    <section
      className="w-full h-[480px] bg-cover bg-center flex justify-center items-center px-4 md:px-8"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">{title}</h1>
          <p className="py-6 text-2xl">{subtitle}</p>
          <button className="btn btn-secondary rounded-2xl text-xl">
            Shop Now
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="w-3/4 sm:w-2/3 md:max-w-md drop-shadow-lg" src={image} />
        </div>
      </div>
    </section>
  );
};

export default CarouselSlide;
