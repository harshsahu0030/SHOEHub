import { useEffect, useState } from "react";
import Header_admin from "../../components/admin/header_admin";
import Sidebar_admin from "../../components/admin/sidebar_admin";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  categories_admin,
  colors_admin,
  sizes_admin,
} from "../../data/admin/category";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { createProductAction } from "../../actions/user/productAction";
import Loader from "../../components/user/loader";

const Product_admin = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.product);
  const [productForm, setProductForm] = useState({
    brand: "",
    title: "",
    description: "",
    gender: "",
    category: "",
    stock: "",
    action: "",
    size: "",
    color: "",
    mrp: "",
    price: "",
  });
  const [images, setImages] = useState([]);

  console.log(loading);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (e) => {
    setImages(() => images.filter((i) => i !== images[e]));
  };

  const handleChange = (event) => {
    setProductForm({
      ...productForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProductAction({ ...productForm, images }));
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      setTimeout(() => {
        navigate("/admin/products");
      }, [1000]);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [message, dispatch, error, alert, navigate]);

  return (
    <div className="product_admin_container">
      <div className="admin_sidebar">
        <Sidebar_admin />
      </div>
      <div className="product_admin_main">
        <Header_admin />
        {loading ? (
          <Loader />
        ) : (
          <form
            className="product_admin_form"
            onSubmit={handleSubmit}
            disabled={loading === false}
          >
            <h1>Create New Product</h1>

            <div className="product_admin_form_wrapper">
              <div className="product_admin_form_left">
                <div className="product_admin_image_container">
                  {images.length > 0 ? (
                    images.map((image, index) => (
                      <div key={index} className="product_admin_image">
                        <img src={image} alt="Product Preview" />
                        <RemoveCircleOutlineIcon
                          onClick={() => handleRemoveImage(index)}
                        />
                      </div>
                    ))
                  ) : (
                    <img
                      src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=82"
                      alt="No Image"
                    />
                  )}
                </div>

                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={images.length >= 6}
                />
                {images && images.length >= 6 && (
                  <p className="red">
                    No. of images exceed of your product (only 6 allowed)
                  </p>
                )}
              </div>

              <div className="product_admin_form_right">
                <div className="product_admin_input">
                  <label htmlFor="brand">Product Brand :</label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Enter Product Brand ..."
                    value={productForm.brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="product_admin_input">
                  <label htmlFor="title">Product Title :</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Product Title ..."
                    value={productForm.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="product_admin_input">
                  <label htmlFor="description">Product Description :</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Enter Product Description ..."
                    value={productForm.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="product_admin_input_half ">
                  <div>
                    <label htmlFor="gender">Target Gender:</label>
                    <select
                      name="gender"
                      id="gender"
                      placeholder="Enter Gender ..."
                      value={productForm.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value={""}>Choose Gender</option>

                      {categories_admin &&
                        categories_admin.sort().map((item) => (
                          <option key={item.gender} value={item.gender}>
                            {item.gender}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="category">Product Category :</label>
                    <select
                      type="number"
                      name="category"
                      id="category"
                      placeholder="Enter Category ..."
                      value={productForm.category}
                      onChange={handleChange}
                      disabled={productForm.gender === ""}
                      required
                    >
                      <option value={""}>Choose Category</option>

                      {categories_admin &&
                        productForm.gender !== "" &&
                        categories_admin
                          .find((item) => item.gender === productForm.gender)
                          .types.sort()
                          .map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>

                <div className="product_admin_input_half ">
                  <div>
                    <label htmlFor="stock">Product Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      placeholder="Enter Stock ..."
                      value={productForm.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="action">Product Action :</label>

                    <select
                      name="action"
                      id="action"
                      placeholder="Enter Category ..."
                      value={productForm.action}
                      onChange={handleChange}
                      required
                    >
                      <option value={""}>Choose Action</option>
                      <option value={"active"}>Active</option>
                      <option value={"deactive"}>De-active</option>
                    </select>
                  </div>
                </div>

                <div className="product_admin_input_half ">
                  <div>
                    <label htmlFor="color">Product Colour :</label>

                    <select
                      type="number"
                      name="color"
                      id="color"
                      placeholder="Enter Category ..."
                      value={productForm.color}
                      onChange={handleChange}
                      required
                    >
                      <option value={""}>Choose Colour</option>

                      {colors_admin &&
                        Object.entries(colors_admin).map((item) => (
                          <option key={item} value={item[0]}>
                            {item[0]}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="size">Product Size :</label>
                    <select
                      type="number"
                      name="size"
                      id="size"
                      placeholder="Enter Size ..."
                      value={productForm.size}
                      onChange={handleChange}
                      required
                    >
                      <option value={""}>Choose Size</option>

                      {sizes_admin &&
                        sizes_admin.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="product_admin_input_half ">
                  <div>
                    <label htmlFor="mrp">Product MRP (in ₹) :</label>
                    <input
                      type="number"
                      name="mrp"
                      id="mrp"
                      placeholder="Enter Market Price ..."
                      value={productForm.mrp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Product Selling Price (in ₹):</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter Selling Price ..."
                      value={productForm.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn" disabled={loading}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Product_admin;
