import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import OrderCart from "../../components/user/OrderCart";
import Breadcrumbs from "../../components/user/breadcrumbs";
import Header from "../../components/user/header";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartAction } from "../../actions/user/userAction";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.getUserCart);

  useEffect(() => {
    dispatch(getUserCartAction());
  }, [dispatch]);

  return (
    <div className="cart_container">
      <Header />
      <Breadcrumbs />
      <h1>YOUR CART</h1>

      <div className="cart_wrapper">
        <div className="cart_orders">
          {cart &&
            cart.map((item) => <OrderCart key={item._id} product={item} />)}

          <button
            className="btn cart_orders_addmore"
            onClick={() => navigate("/wishlist")}
          >
            <BookmarkBorderOutlinedIcon /> APP MORE FROM WISHLIST
          </button>
        </div>
        <div className="cart_calculations">
          <h5>PRICE DETAILS ({cart && cart.length} items)</h5>
          <div>
            <p>Total MRP</p>
            <p>{cart && `₹${cart.reduce((acc, item) => acc + item.mrp, 0)}`}</p>
          </div>
          <div>
            <p>Discount on MRP</p>
            <p style={{ color: "lightgreen" }}>
              {cart &&
                `₹${cart.reduce(
                  (acc, item) => acc + item.mrp - item.price,
                  0
                )}`}
            </p>
          </div>
          {/* <div>
            <p>Plateform Fee</p>
            <p style={{ color: "lightgreen" }}>Free</p>
          </div> */}
          <div>
            <p>Shipping Fee</p>
            <p>
              <del>₹79</del> <span style={{ color: "lightgreen" }}>Free</span>
            </p>
          </div>
          {/* <div>
            <p>Coupon Discount</p>
            <p style={{ color: "orange" }}>Apply Now</p>
          </div> */}
          <hr />
          <div>
            <p style={{ fontWeight: 800 }}>Total Amount</p>
            <p>
              {cart && `₹${cart.reduce((acc, item) => acc + item.price, 0)}`}
            </p>
          </div>
          <button
            className="btn"
            onClick={() => navigate("/cart/order-confirmation")}
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
