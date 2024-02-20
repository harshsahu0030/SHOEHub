import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCart = ({ data }) => {
  const navigate = useNavigate();

  return (
    data && (
      <div className="productCard_container">
        <div className="productCart_wrapper">
          <img src={data.images[0].url} alt="product image" />

          <div className="products_detail">
            <h5>{data.brand}</h5>
            <h4>{data.title}</h4>
            <p>
              {data.description.length > 150
                ? `${data.description.slice(0, 135)}...`
                : data.description}
            </p>
          </div>

          <div className="products_price">
            <h2>₹{data.price}</h2>
            <span>
              MRP <del>{data.mrp}</del>{" "}
            </span>
            <span>(Rs. {data.mrp - data.price} OFF)</span>
          </div>

          <div className="products_buttons">
            <button
              className="btn"
              onClick={() =>
                navigate(
                  `/products/${data.gender.toLowerCase()}/${data.category.toLowerCase()}/${
                    data._id
                  }`
                )
              }
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    )
  );
};

ProductCart.propTypes = {
  data: PropTypes.object,
};

export default ProductCart;
