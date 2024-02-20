import axios from "axios";

//create product -- POST
export const createProductAction = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateProductRequest",
    });

    const link = `/api/v1/admin/product/create`;
    const { data } = await axios.post(link, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "CreateProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CreateProductFailure",
      payload: error.response.data.message,
    });
  }
};

//update product -- PUT
export const updateProductAction = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateProductRequest",
    });

    const link = `/api/v1/admin/product/${id}`;

    const { data } = await axios.put(link, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "UpdateProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UpdateProductFailure",
      payload: error.response.data.message,
    });
  }
};

//delete product -- DELETE
export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteProductRequest",
    });

    const link = `/api/v1/admin/product/${id}`;
    const { data } = await axios.delete(link);

    dispatch({
      type: "DeleteProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "DeleteProductFailure",
      payload: error.response.data.message,
    });
  }
};

//get all products -- GET
export const getAllProductAction =
  (
    gender = "",
    category = "",
    lPrice = 99999,
    hPrice = 0,
    lRating = -1,
    hRating = 5.1,
    keyword = "",
    page = 1
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "GetAllProductsRequest",
      });

      let link = `/api/v1/products?price[gt]=${hPrice}&price[lt]=${lPrice}&ratings[gt]=${lRating}&ratings[lt]=${hRating}&page=${page}`;

      if (gender) {
        link = `/api/v1/products?gender=${gender}&price[gt]=${hPrice}&price[lt]=${lPrice}&ratings[gt]=${lRating}&ratings[lt]=${hRating}&page=${page}`;
      }

      if (keyword) {
        link = `/api/v1/products?keyword=${keyword}&price[gt]=${hPrice}&price[lt]=${lPrice}&ratings[gt]=${lRating}&ratings[lt]=${hRating}&page=${page}`;
      }

      if (category) {
        link = `/api/v1/products?gender=${gender}&category=${category}&price[gt]=${hPrice}&price[lt]=${lPrice}&ratings[gt]=${lRating}&ratings[lt]=${hRating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: "GetAllProductsSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GetAllProductsFailure",
        payload: error.response.data.message,
      });
    }
  };

//get product -- GET
export const getProductAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GetProductRequest",
    });

    const link = `/api/v1/product/${id}`;
    const { data } = await axios.get(link);

    dispatch({
      type: "GetProductSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GetProductFailure",
      payload: error.response.data.message,
    });
  }
};

//get latest products -- GET
export const getLatestProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetLatestProductsRequest",
    });

    const link = `/api/v1/products/latest?page=1`;
    const { data } = await axios.get(link);

    dispatch({
      type: "GetLatestProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GetLatestProductsFailure",
      payload: error.response.data.message,
    });
  }
};

//get top rated products -- GET
export const getTopRatedProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetTopRatedProductsRequest",
    });

    const link = `/api/v1/products/toprated?page=1`;
    const { data } = await axios.get(link);

    dispatch({
      type: "GetTopRatedProductsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GetTopRatedProductsFailure",
      payload: error.response.data.message,
    });
  }
};

//add and update product review -- PUT
export const addAndupdateProductReviewAction =
  (id, rating, comment) => async (dispatch) => {
    try {
      dispatch({
        type: "addAndUpdateProductReviewRequest",
      });

      const link = `/api/v1/product/review/${id}`;

      const { data } = await axios.put(
        link,
        { rating, comment },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "addAndUpdateProductReviewSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "addAndUpdateProductReviewFailure",
        payload: error.response.data.message,
      });
    }
  };
