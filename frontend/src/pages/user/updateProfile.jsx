import Header from "../../components/user/header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserAction,
  updateUserProfileAction,
} from "../../actions/user/userAction";
import Footer from "../../components/footer";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/user/breadcrumbs";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, message, error } = useSelector((state) => state.userProfile);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState();
  const alert = useAlert();

  const handleChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
        setAvatarPrev(Reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfileAction({ ...updateForm, avatar }));
    await dispatch(loadUserAction());
  };

  useEffect(() => {
    if (user) {
      setUpdateForm({ ...user, [user.key]: user.value });
      setAvatarPrev(() => user.avatar.url);
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/profile");
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [user, message, dispatch, error, alert, navigate]);

  return (
    <div className="signup_container">
      <Header />
      <Breadcrumbs />
      <div className="signup_wrapper">
        <div className="signup_form">
          <p className="title">Update Profile</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="personal-image">
                <label className="label">
                  <input type="file" onChange={handleImgChange} />
                  <figure className="personal-figure">
                    <img
                      src={avatarPrev}
                      className="personal-avatar"
                      alt="avatar"
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
                value={updateForm.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter email"
                value={updateForm.email}
                onChange={handleChange}
              />
            </div>

            <button className="sign btn" type="submit" disabled={loading}>
              Update
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
