import { lazy, useEffect, useMemo } from "react";
import Header from "../../components/user/header";
import CategorySection from "../../components/user/categorySection";
import { banner_data } from "../../data/admin/banner";
import ProductCarousel from "../../components/user/productCarousel";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getLatestProductsAction,
  getTopRatedProductsAction,
} from "../../actions/user/productAction";
import { useAlert } from "react-alert";

const Banner = lazy(() => import("../../components/user/banner"));

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error: latestError, products: latestProducts } = useSelector(
    (state) => state.getLatestProducts
  );
  const { error: topRatedError, products: topRatedProducts } = useSelector(
    (state) => state.getTopRatedProducts
  );

  useMemo(() => {
    dispatch(getLatestProductsAction());
    dispatch(getTopRatedProductsAction());
  }, [dispatch]);

  useEffect(() => {
    //errors
    if (latestError) {
      alert.error(latestError);
      dispatch({ type: "clearErrors" });
    }
    if (topRatedError) {
      alert.error(topRatedError);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, topRatedError, latestError, alert]);
  return (
    <div className="home_container">
      <Header />
      <div className="home_wrapper">
        <Banner position="right" data={banner_data[0]} />
        <CategorySection />
        <Banner position="left" data={banner_data[1]} />
        <ProductCarousel
          heading="EXPLORE OUR"
          highlightedHeading="TRENDING SHOES OF ALL TIME"
          data={latestProducts}
        />
        <Banner position="right" data={banner_data[2]} />
        <ProductCarousel
          heading="EXPLORE OUR"
          highlightedHeading="TOP-RATED ALL OF TIME"
          data={topRatedProducts}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
