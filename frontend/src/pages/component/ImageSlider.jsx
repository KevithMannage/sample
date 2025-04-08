import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample advertisement images
const ads = [
  {
    id: 1,
    imageUrl: 'https://th.bing.com/th/id/OIP.rwYN-_a6YrgPJIO8U0pBnAHaD4?rs=1&pid=ImgDetMain',
    alt: 'Ad 1',
  },
  {
    id: 2,
    imageUrl: 'https://th.bing.com/th/id/OIP._UxWVQAyvSoMpjuZ3G_jygHaEK?w=1280&h=720&rs=1&pid=ImgDetMain',
    alt: 'Ad 2',
  },
  {
    id: 3,
    imageUrl: 'https://th.bing.com/th/id/OIP.vGVaoGh0OEqNsEb6hD7tfwHaDq?w=1110&h=550&rs=1&pid=ImgDetMain',
    alt: 'Ad 3',
  },
  {
    id: 4,
    imageUrl: 'https://www.guidemecareer.com/backend/blogimages/top-career-options-commerce.jpg',
    alt: 'Ad 4',
  },
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-4">
      <Slider {...settings}>
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="relative w-full h-48 sm:h-64 lg:h-80 flex items-center justify-center bg-[#ebf8ff]"
          >
            <img
              src={ad.imageUrl}
              alt={ad.alt}
              className="w-full h-full max-w-[800px] object-contain rounded-lg mx-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;