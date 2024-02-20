import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.user);
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      setTimeout(() => {
        navigate("/");
      }, [1000]);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [message, dispatch, error, alert, navigate]);

  return (
    <div className="signin_container">
      <Header />
      <div className="signin_wrapper">
        <div className="signin_form">
          <p className="title">Forgot Password</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Ener email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="sign btn" type="submit" disabled={loading}>
              Send
            </button>
          </form>
          <div className="social-message">
            <div className="line"></div>
            <p className="message">Do Not Have Account ?</p>
            <div className="line"></div>
          </div>

          <p className="signup">
            <Link rel="noopener noreferrer" to={"/signup"} className="">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
