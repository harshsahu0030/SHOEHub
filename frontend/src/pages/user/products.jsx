import Footer from "../../components/footer";
import Header from "../../components/user/header";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/user/breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import {
  categories_admin,
  colors_admin,
  sizes_admin,
} from "../../data/admin/category";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAction } from "../../actions/user/productAction";
import ProductCart from "../../components/user/productCart";
import Loader from "../../components/user/loader";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PaginationCom from "../../components/pagination";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, products, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.getAllProducts);

  //states
  const { gender, category, keyword } = useParams();
  const [checkGender, setCheckGender] = useState("men");
  const [checkCategory, setCheckCategory] = useState("");
  const [page, setPage] = useState(1);
  const [lPrice, setLPrice] = useState(100000);
  const [hPrice, setHPrice] = useState(0);
  const [lRating, setLRating] = useState(-1);
  const [hRating, setHRating] = useState(5.1);

  //funtions
  const handleGender = (e) => {
    setCheckGender(e.target.value);
    navigate(`/products/${e.target.value}`);
  };

  const handleRatingChange = (e) => {
    setLRating(e.target.value.split(",")[0]);
    setHRating(e.target.value.split(",")[1]);
  };

  const handlePriceChange = (e) => {
    setHPrice(e.target.value.split(",")[0]);
    setLPrice(e.target.value.split(",")[1]);
  };

  const handleCategory = (e) => {
    setCheckCategory(e.target.value);
    navigate(`/products/${checkGender}/${e.target.value}`);
  };

  //useEffect
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (gender) {
      setCheckGender(gender);
    } else {
      setCheckGender("");
    }

    if (category) {
      setCheckCategory(category);
    } else {
      setCheckCategory("");
    }

    dispatch(
      getAllProductAction(
        gender,
        category,
        lPrice,
        hPrice,
        lRating,
        hRating,
        keyword,
        page
      )
    );
  }, [
    gender,
    category,
    dispatch,
    lPrice,
    hPrice,
    lRating,
    hRating,
    keyword,
    page,
  ]);

  return (
    <div className="products_container">
      <Header />
      <Breadcrumbs />
      <div className="products_wrapper">
        <div className="products_left">
          <h3>FILTERS</h3>
          <hr />
          <h5>GENDER</h5>
          {categories_admin &&
            categories_admin.map((item, index) => {
              return (
                <div key={index} className="product_ckeckboxes">
                  <input
                    type="radio"
                    name="gender"
                    value={item.gender}
                    onClick={handleGender}
                    checked={checkGender === item.gender}
                  />
                  <label htmlFor="gender">{item.gender}</label>
                </div>
              );
            })}

          <hr />
          <h5>CATEGORIES</h5>
          {categories_admin && gender
            ? categories_admin
                ?.find((item) => item.gender === gender)
                .types.sort()
                .map((item, index) => (
                  <div key={index} className="product_ckeckboxes">
                    <input
                      type="radio"
                      name="category"
                      value={item}
                      onChange={handleCategory}
                      checked={checkCategory === item}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                ))
            : categories_admin
                ?.find((item) => item.gender === "men")
                .types.sort()
                .map((item, index) => (
                  <div key={index} className="product_ckeckboxes">
                    <input
                      type="radio"
                      name="category"
                      value={item}
                      onChange={handleCategory}
                      checked={checkCategory === item}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                ))}

          <hr />

          <h5>PRICES</h5>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="prices"
              value={["0", "1000"]}
              onChange={handlePriceChange}
            />
            <label htmlFor="">₹0 - ₹999</label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="prices"
              value={["999", "3000"]}
              onChange={handlePriceChange}
            />
            <label htmlFor="">₹1,000 - ₹2,999</label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="prices"
              value={["2999", "5000"]}
              onChange={handlePriceChange}
            />
            <label htmlFor="">₹3,000 - ₹4,999</label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="prices"
              value={["4999", "8000"]}
              onChange={handlePriceChange}
            />
            <label htmlFor="">₹5,000 - ₹7,999</label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="prices"
              value={["7999", "10000"]}
              onChange={handlePriceChange}
            />
            <label htmlFor="">₹8,000 - ₹9,999</label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="prices"
              value={["9999", "50000"]}
              onChange={handlePriceChange}
            />
            <label htmlFor="">₹10,000 - ₹49,999</label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="prices"
              value={["49999", "99999"]}
              onChange={handlePriceChange}
            />
            <label htmlFor="">₹50,000 - ₹99,999</label>
          </div>

          <hr />

          <h5>RATINGS</h5>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="ratings"
              value={["-1", "5.1"]}
              onChange={handleRatingChange}
            />
            <label htmlFor="">
              <StarOutlineIcon /> <StarOutlineIcon /> <StarOutlineIcon />{" "}
              <StarOutlineIcon /> <StarOutlineIcon /> & up
            </label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="ratings"
              value={["0.9", "5.1"]}
              onChange={handleRatingChange}
            />
            <label htmlFor="">
              <StarRateIcon /> <StarOutlineIcon /> <StarOutlineIcon />{" "}
              <StarOutlineIcon /> <StarOutlineIcon /> & up
            </label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="ratings"
              value={["1.9", "5.1"]}
              onChange={handleRatingChange}
            />
            <label htmlFor="">
              <StarRateIcon />
              <StarRateIcon /> <StarOutlineIcon />
              <StarOutlineIcon />
              <StarOutlineIcon />& up
            </label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="ratings"
              value={["2.9", "5.1"]}
              onChange={handleRatingChange}
            />
            <label htmlFor="">
              <StarRateIcon />
              <StarRateIcon />
              <StarRateIcon />
              <StarOutlineIcon />
              <StarOutlineIcon /> & up
            </label>
          </div>
          <div className="product_ckeckboxes">
            <input
              type="radio"
              name="ratings"
              value={["3.9", "5.1"]}
              onChange={handleRatingChange}
            />
            <label htmlFor="">
              <StarRateIcon />
              <StarRateIcon />
              <StarRateIcon />
              <StarRateIcon />
              <StarOutlineIcon /> & up
            </label>
          </div>
        </div>

        <div className="products_right">
          <div className="products_right_top">
            <div className="products_right_top_left">
              <div className="products_right_top_select">
                <select>
                  <option value="">SELECT SIZE :</option>
                  {sizes_admin &&
                    sizes_admin.map((item) => (
                      <option key={item} value={item}>
                        {item} UK
                      </option>
                    ))}
                </select>
              </div>
              <div className="products_right_top_select">
                <select>
                  <option value="">SELECT COLOUR :</option>
                  {colors_admin &&
                    Object.entries(colors_admin).map((item, index) => (
                      <option key={index} value={item[0]}>
                        {item[0]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="products_right_top_right">
              <div className="products_right_top_select">
                <select>
                  <option value=""> SORT BY :</option>
                  <option value=""> Recommended</option>
                  <option value=""> Price : High to Low </option>
                  <option value=""> Price : Low to High </option>
                  <option value=""> Trending</option>
                  <option value=""> CustomerRatings</option>
                </select>
              </div>
            </div>
          </div>
          <p>Filtered Products Count: {products && products.length}</p>
          <div className="products_right_bottom">
            {loading ? (
              <Loader />
            ) : products && products.length > 0 ? (
              products.map((item) => <ProductCart key={item._id} data={item} />)
            ) : (
              <h2>NO PRODUCTS FOUND</h2>
            )}
          </div>
          {products && (
            <PaginationCom
              products={filteredProductsCount}
              resultPerPage={resultPerPage}
              setPage={setPage}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
