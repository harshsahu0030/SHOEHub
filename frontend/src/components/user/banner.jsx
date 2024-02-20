import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Banner = ({ data, position }) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        position === "right"
          ? "banner_container"
          : "banner_container banner_reverse"
      }
    >
      <div className="banner_left">
        <div>
          <h3>{data.title}</h3>
          <h1>
            {data.subTitle} <p>{data.highLightedTitle}</p>
          </h1>
          <h5>{data.discription}</h5>

          <button
            className="btn"
            onClick={() =>
              navigate(
                `/products/${data.gender.toLowerCase()}/${data.category.toLowerCase()}/${
                  data.productId
                }`
              )
            }
          >
            Shop Now
          </button>
        </div>
      </div>
      <div className="banner_right">
        <img className="float-animation" src={data.imgUrl} alt="banner_img" />
      </div>
    </div>
  );
};

Banner.propTypes = {
  data: PropTypes.object,
  position: PropTypes.string,
};

export default Banner;
