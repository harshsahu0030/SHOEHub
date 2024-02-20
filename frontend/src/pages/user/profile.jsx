import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/user/header";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { logoutUserAction } from "../../actions/user/userAction";
import Breadcrumbs from "../../components/user/breadcrumbs";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();

  const handlelogout = () => {
    dispatch(logoutUserAction());
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
    <div className="profile_container">
      <Header />
      <Breadcrumbs />

      <div className="profile_wrapper">
        <div className="profile_left">
          <ul>
            <li onClick={() => navigate("/profile/orders")}>
              Orders <KeyboardArrowRightIcon />
            </li>
            <li onClick={() => navigate("/profile/update")}>
              Update Profile <KeyboardArrowRightIcon />
            </li>
            <li onClick={() => navigate("/profile/password")}>
              Update Password <KeyboardArrowRightIcon />
            </li>
            <li onClick={handlelogout}>
              Logout <KeyboardArrowRightIcon />
            </li>
          </ul>
        </div>
        {user && (
          <div className="profile_right">
            <h2>Profile</h2>
            <img src={user.avatar.url} alt="avatar" />
            <h5>{user.name}</h5>
            <h5>{user.email}</h5>
            <h5>{user.contact}</h5>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
