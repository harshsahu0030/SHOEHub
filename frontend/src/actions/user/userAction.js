import axios from "axios";

//register user -- POST
export const userRegisterAction = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterUserRequest",
    });

    const link = `/api/v1/register`;
    const { data } = await axios.post(link, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    await window.localStorage.setItem("signupUser", JSON.stringify(userData));

    dispatch({
      type: "RegisterUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "RegisterUserFailure",
      payload: error.response.data.message,
    });
  }
};

//register user verified -- POST
export const userRegisterVerifiedAction =
  (id, userData) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterUserVerifiedRequest",
      });

      const link = `/api/v1/register/verified/${id}`;
      const { data } = await axios.post(link, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "RegisterUserVerifiedSuccess",
        payload: data,
      });

      await window.localStorage.removeItem("signupUser");
    } catch (error) {
      dispatch({
        type: "RegisterUserVerifiedFailure",
        payload: error.response.data.message,
      });
    }
  };

//login user --POST
export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginUserRequest",
    });

    const link = `/api/v1/login`;
    const { data } = await axios.post(
      link,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoginUserFailure",
      payload: error.response.data.message,
    });
  }
};

//load user --GET
export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const link = `/api/v1/me`;
    const { data } = await axios.get(link);

    dispatch({
      type: "LoadUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
    });
  }
};

//logout user
export const logoutUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    const link = `/api/v1/logout`;
    const { data } = await axios.get(link);

    dispatch({
      type: "LogoutUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

//update profile --PUT
export const updateUserProfileAction = (updateForm) => async (dispatch) => {
  try {
    dispatch({
      type: "ProfileUpdateRequest",
    });

    const link = `/api/v1/update/profile`;
    const { data } = await axios.put(link, updateForm, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "ProfileUpdateSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ProfileUpdateFailure",
      payload: error.response.data.message,
    });
  }
};

//update password --PUT
export const updateUserPasswordAction =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "PasswordUpdateRequest",
      });

      const link = `/api/v1/update/password`;
      const { data } = await axios.put(
        link,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "PasswordUpdateSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PasswordUpdateFailure",
        payload: error.response.data.message,
      });
    }
  };

//get user wishlist
export const getUserWishlist = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetUserWishlistRequest",
    });

    const link = `/api/v1/wishlist`;
    const { data } = await axios.get(link);

    dispatch({
      type: "GetUserWishlistSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GetUserWishlistFailure",
      payload: error.response.data.message,
    });
  }
};

//user wishlist --PUT
export const userWishlistAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "UserWishlistRequest",
    });

    const link = `/api/v1/wishlist/update/${id}`;
    const { data } = await axios.put(
      link,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "UserWishlistSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UserWishlistFailure",
      payload: error.response.data.message,
    });
  }
};

//get user cart
export const getUserCartAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetUserCartRequest",
    });

    const link = "/api/v1/cart";
    const { data } = await axios.get(link);

    dispatch({
      type: "GetUserCartSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GetUserCartFailure",
      payload: error.response.data.message,
    });
  }
};

//user wishlist --PUT
export const userCartAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "UserCartRequest",
    });

    const link = `/api/v1/cart/update/${id}`;
    const { data } = await axios.put(
      link,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "UserCartSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UserCartFailure",
      payload: error.response.data.message,
    });
  }
};
