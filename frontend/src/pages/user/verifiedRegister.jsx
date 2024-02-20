import Header from "../../components/user/header";
import Footer from "../../components/footer";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { userRegisterVerifiedAction } from "../../actions/user/userAction";
import { useParams } from "react-router-dom";
import Loader from "../../components/user/loader";
import Breadcrumbs from "../../components/user/breadcrumbs";

const VerifiedRegister = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);
  const alert = useAlert();
  const { id } = useParams();

  //states
  const [registerForm, setRegisterForm] = useState({});
  const [otp, setOtp] = useState("");

  console.log(id);

  // funtions
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegisterVerifiedAction(id, { ...registerForm, otp }));
  };

  //useEfffect
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("signupUser"));
    setRegisterForm(data);
  }, []);

  useEffect(() => {
    if (message) {
      alert.success(message);
      setTimeout(() => {}, [500]);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [message, dispatch, error, alert]);

  return (
    <div className="signin_container">
      <Header />
      <Breadcrumbs />
      <div className="signin_wrapper">
        {loading ? (
          <Loader />
        ) : (
          <div className="signin_form">
            <p className="title">EMAIL VERIFICATION</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">OTP</label>
                <input
                  maxLength="4"
                  minLength="4"
                  type="text"
                  name="otp"
                  placeholder="Ener OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button className="sign btn" type="submit" disabled={loading}>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VerifiedRegister;
