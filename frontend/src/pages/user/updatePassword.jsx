import { useEffect, useState } from "react";
import Header from "../../components/user/header";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserAction,
  updateUserPasswordAction,
} from "../../actions/user/userAction";
import Footer from "../../components/footer";
import { useAlert } from "react-alert";
import Breadcrumbs from "../../components/user/breadcrumbs";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [oldpassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, message, error } = useSelector((state) => state.userProfile);
  const alert = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updateUserPasswordAction(oldpassword, newPassword, confirmPassword)
    );
    await dispatch(loadUserAction());
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [message, dispatch, error, alert]);

  return (
    <div className="signup_container">
      <Header />
      <Breadcrumbs />
      <div className="signup_wrapper">
        <div className="signup_form">
          <p className="title">Update Password</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Old Password</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="name">New Password</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="name">Confirm Password</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UpdatePassword;
