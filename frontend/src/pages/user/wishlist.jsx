import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/user/header";
import ProductCart from "../../components/user/productCart";
import { useMemo } from "react";
import { getUserWishlist } from "../../actions/user/userAction";
import Loader from "../../components/user/loader";
import Breadcrumbs from "../../components/user/breadcrumbs";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.getUserWishlist);

  useMemo(() => {
    dispatch(getUserWishlist());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="wishlist_container">
      <Header />
      <Breadcrumbs />
      <h1>YOUR WISHLIST</h1>
      <div className="wishlist_wrapper">
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((item) => <ProductCart key={item._id} data={item} />)
        ) : (
          <h1>NO PRODUCT IN YOUR WISHLIST</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
