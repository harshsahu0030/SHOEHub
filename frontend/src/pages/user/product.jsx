import Header from "../../components/user/header";
import ProductSlider from "../../components/user/productSlider";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RatingsOverview from "../../components/user/ratingsOverview";
import Footer from "../../components/footer";
import { useEffect, useMemo, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductAction } from "../../actions/user/productAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";

import {
  loadUserAction,
  userCartAction,
  userWishlistAction,
} from "../../actions/user/userAction";
import Loader from "../../components/user/loader";
import AddComment from "../../components/user/addComment";
import Breadcrumbs from "../../components/user/breadcrumbs";

const Product = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { message, error, product, loading } = useSelector(
    (state) => state.getProduct
  );
  const { user } = useSelector((state) => state.user);

  const { message: wishlistmsg, error: wishlistErr } = useSelector(
    (state) => state.userWishlist
  );

  const { message: cartMsg, error: cartErr } = useSelector(
    (state) => state.userCart
  );

  const [wishlist, setwishlist] = useState(user && user.wishlist.includes(id));
  const [cart, setCart] = useState(user && user.cart.includes(id));

  const handleWishlist = async () => {
    setwishlist((prev) => !prev);
    await dispatch(userWishlistAction(id));
    await dispatch(loadUserAction());
  };

  const handleCart = async () => {
    setCart((prev) => !prev);
    await dispatch(userCartAction(id));
    await dispatch(loadUserAction());
  };

  useMemo(() => {
    dispatch(getProductAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      setTimeout(() => {
        navigate("/");
      }, [1000]);
      dispatch({ type: "clearErrors" });
    }

    if (wishlistmsg) {
      alert.success(wishlistmsg);
      dispatch({ type: "clearMessage" });
    }
    if (wishlistErr) {
      alert.error(wishlistErr);
      dispatch({ type: "clearErrors" });
    }

    if (cartMsg) {
      alert.success(cartMsg);
      dispatch({ type: "clearMessage" });
    }

    if (cartErr) {
      alert.error(cartErr);
      dispatch({ type: "clearErrors" });
    }
  }, [
    message,
    dispatch,
    error,
    alert,
    navigate,
    id,
    wishlistErr,
    wishlistmsg,
    cartErr,
    cartMsg,
  ]);
  return (
    <div className="product_container">
      <Header />
      <Breadcrumbs />

      {!loading ? (
        <>
          {product && (
            <>
              <div className="product_wrapper">
                <div className="product_left">
                  <ProductSlider imagesData={product.images} />
                </div>
                <div className="product_right">
                  <div className="product_head">
                    <h5>{product.brand}</h5>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                  </div>

                  <div className="product_overview">
                    <span>
                      {product.ratings} <StarRateIcon />
                    </span>
                    |<span>{product.reviews.length} Reviews</span>
                  </div>

                  <div className="product_price">
                    <h2>₹{product.price}</h2>
                    <span>
                      MRP <del>₹{product.mrp}</del>{" "}
                    </span>
                    <span>(₹ {product.mrp - product.price} OFF)</span>
                  </div>
                  <h6>Inclusive of all taxes</h6>

                  <div className="product_buttons">
                    {cart && user ? (
                      <button className="btn" onClick={handleCart}>
                        <WorkIcon style={{ color: "#010556" }} />
                        ALREADY IN CART
                      </button>
                    ) : (
                      <button className="btn" onClick={handleCart}>
                        <WorkOutlineOutlinedIcon />
                        ADD TO CART
                      </button>
                    )}

                    {wishlist && user ? (
                      <button className="btn" onClick={handleWishlist}>
                        <FavoriteIcon style={{ color: "red" }} />
                        WISHLISTED
                      </button>
                    ) : (
                      <button className="btn" onClick={handleWishlist}>
                        <FavoriteBorderIcon />
                        WISHLIST
                      </button>
                    )}
                  </div>

                  <hr />

                  <h5>
                    PRODUCT DETAILS <LocalShippingOutlinedIcon />
                  </h5>
                  <div className="product_details">
                    <div>
                      Gender : <strong> {product.gender}</strong>
                    </div>
                    <div>
                      Category : <strong> {product.category}</strong>
                    </div>
                    <div>
                      Size : <strong>{product.size} UK</strong>
                    </div>
                    <div>
                      Colour : <strong>{product.color}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <RatingsOverview product={product} />
              <AddComment product={product} />
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
      <Footer />
    </div>
  );
};

export default Product;
