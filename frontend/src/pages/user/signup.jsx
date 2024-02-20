import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../actions/user/userAction";
import Footer from "../../components/footer";
import { useAlert } from "react-alert";
import Breadcrumbs from "../../components/user/breadcrumbs";
import { userImg } from "../../data/admin/banner.js";
import Loader from "../../components/user/loader.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(userImg);
  const { loading, message, error, otp } = useSelector((state) => state.user);
  const alert = useAlert();

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegisterAction({ ...registerForm, avatar }));
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      setTimeout(() => {
        navigate(`/signup/${otp._id}`);
      }, [500]);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [message, dispatch, error, alert, navigate]);

  return (
    <div className="signup_container">
      <Header />
      <Breadcrumbs />

      <div className="signup_wrapper">
        {loading ? (
          <Loader />
        ) : (
          <div className="signup_form">
            <p className="title">Signup</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="personal-image">
                  <label className="label">
                    <input type="file" onChange={handleImgChange} />
                    <figure className="personal-figure">
                      <img
                        src={avatar}
                        className="personal-avatar"
                        alt="avatar"
                        required
                      />
                      <figcaption className="personal-figcaption">
                        <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                      </figcaption>
                    </figure>
                  </label>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  value={registerForm.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={registerForm.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={registerForm.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="sign btn" type="submit" disabled={loading}>
                Sign up
              </button>
            </form>

            <div className="social-message">
              <div className="line"></div>
              <p className="message">Already have an account?</p>
              <div className="line"></div>
            </div>

            <p className="signup">
              <Link rel="noopener noreferrer" to={"/signup"} className="">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
