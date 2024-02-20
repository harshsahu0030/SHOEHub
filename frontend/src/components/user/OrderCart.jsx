import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCartAction,
  loadUserAction,
  userCartAction,
} from "../../actions/user/userAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";

const OrderCart = ({ product, type }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { message: cartMsg, error: cartErr } = useSelector(
    (state) => state.userCart
  );

  const handleRemoveProduct = async () => {
    await dispatch(userCartAction(product && product._id));
    await dispatch(loadUserAction());
    await dispatch(getUserCartAction());
  };

  useEffect(() => {
    if (cartMsg) {
      alert.success(cartMsg);
      dispatch({ type: "clearMessage" });
    }

    if (cartErr) {
      alert.error(cartErr);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, cartErr, cartMsg, alert]);

  return (
    <div className="orderCart_container">
      <div className="orderCart_wrapper">
        <CloseOutlinedIcon
          style={{ display: type === "confirmation" ? "none" : "static" }}
          onClick={handleRemoveProduct}
        />
        <img src={product.images[0].url} alt="" />
        <div className="orderCart_details">
          <h5>{product.brand}</h5>
          <p className="orderCart_details_des">{product.title}</p>
          <p className="orderCart_details_price">
            ₹{product.price}
            <span>
              {" "}
              MRP <del> ₹{product.mrp}</del>{" "}
            </span>
            <span>( ₹{product.mrp - product.price} OFF )</span>
          </p>

          <span>Size: {product.size} UK</span>

          {/* <div className="orderCart_details_select">
            <label htmlFor="quntity">Qauntity: </label>
            <select name="quantity" id="size">
              {[...Array(3)].map((_, index) => {
                index += 1;

                return (
                  <option key={index} value="1">
                    {index}
                  </option>
                );
              })}
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
};

OrderCart.propTypes = {
  product: propTypes.object,
  type: propTypes.string,
};

export default OrderCart;
