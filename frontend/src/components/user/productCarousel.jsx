// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({ data, heading, highlightedHeading }) => {
  const navigate = useNavigate();

  return (
    <div className="advertisement_container">
      <h3>
        {heading} <span>{highlightedHeading}</span>
      </h3>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data &&
          data.map((item) => {
            return (
              <SwiperSlide key={item._id}>
                <div className="card">
                  <img src={item.images[0].url} alt="product Image" />
                  <div className="content">
                    <p className="title">
                      {item.title}
                      <br />
                      <span>{item.category}</span>
                    </p>
                    <ul className="sci">
                      <li
                        onClick={() => {
                          navigate(
                            `products/${item.gender.toLowerCase()}/${item.category.toLowerCase()}/${
                              item._id
                            }`
                          );
                        }}
                      >
                        Shop Now
                      </li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
  heading: PropTypes.string,
  highlightedHeading: PropTypes.string,
};
export default ProductCarousel;
