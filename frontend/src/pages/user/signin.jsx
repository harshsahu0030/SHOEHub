import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../actions/user/userAction";
import Footer from "../../components/footer";
import { useAlert } from "react-alert";
import Breadcrumbs from "../../components/user/breadcrumbs";
import Loader from "../../components/user/loader";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.user);
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(email, password));
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
      <Breadcrumbs />
      <div className="signin_wrapper">
        {loading ? (
          <Loader />
        ) : (
          <div className="signin_form">
            <p className="title">Login</p>
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
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="forgot">
                  <Link rel="noopener noreferrer" to="/password/forgot">
                    Forgot Password ?
                  </Link>
                </div>
              </div>
              <button className="sign btn" type="submit" disabled={loading}>
                Sign in
              </button>
            </form>
            <div className="social-message">
              <div className="line"></div>
              <p className="message">Dont have an account?</p>
              <div className="line"></div>
            </div>

            <p className="signup">
              <Link rel="noopener noreferrer" to={"/signup"} className="">
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
