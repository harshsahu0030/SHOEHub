import Footer from "../../components/footer";
import Breadcrumbs from "../../components/user/breadcrumbs";
import Header from "../../components/user/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserCartAction } from "../../actions/user/userAction";
import OrderCart from "../../components/user/OrderCart";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.getUserCart);

  //states
  const [addressForm, setAddressForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });
  const [price, setPrice] = useState();

  //functions
  const handleChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem("shippingAddress", JSON.stringify(addressForm));
  };

  //useEffects
  useEffect(() => {
    dispatch(getUserCartAction());
  }, [dispatch]);

  useEffect(() => {
    setPrice(cart && cart.reduce((acc, item) => acc + item.price, 0));
  }, [cart]);

  return (
    <div className="orderConfirmation_container">
      <Header />
      <Breadcrumbs />
      <div className="orderConfirmation_wrapper">
        <form onSubmit={handleSubmit}>
          <p className="title">SHIPPING ADDRESS</p>
          <div className="input-group">
            <label htmlFor="name">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              value={addressForm.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={addressForm.city}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter State"
              value={addressForm.state}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter Country"
              value={addressForm.country}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Pincode</label>
            <input
              type="number"
              name="pinCode"
              placeholder="Enter Pincode"
              value={addressForm.pinCode}
              required
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Contact No.</label>
            <input
              type="text"
              name="phoneNo"
              placeholder="Enter Contact No."
              value={addressForm.phoneNo}
              required
              onChange={handleChange}
            />
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        <div className="orderConfirmation_left">
          <div className="cart_calculations">
            <h5>PRICE DETAILS ({cart && cart.length} items)</h5>
            <div>
              <p>Total MRP</p>
              <p>
                {cart &&
                  `₹${cart && cart.reduce((acc, item) => acc + item.mrp, 0)}`}
              </p>
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
              <p>{cart && `₹${price}`}</p>
            </div>
          </div>
          <div className="orderConfirmation_left_bottom">
            {cart &&
              cart.map((item) => (
                <OrderCart key={item._id} product={item} type="confirmation" />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
