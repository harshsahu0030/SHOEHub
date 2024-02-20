import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import { Suspense } from "react";
import Loader from "./components/user/loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "./actions/user/userAction";

//user routes
const Home = lazy(() => import("./pages/user/home"));
const Signin = lazy(() => import("./pages/user/signin"));
const Signup = lazy(() => import("./pages/user/signup"));
const Wishlist = lazy(() => import("./pages/user/wishlist"));
const Cart = lazy(() => import("./pages/user/cart"));
const Product = lazy(() => import("./pages/user/product"));
const Products = lazy(() => import("./pages/user/products"));
const Profile = lazy(() => import("./pages/user/profile"));
const UpdateProfile = lazy(() => import("./pages/user/updateProfile"));
const UpdatePassword = lazy(() => import("./pages/user/updatePassword"));
const ForgotPassword = lazy(() => import("./pages/user/forgotPassword"));
const Orders = lazy(() => import("./pages/user/orders"));
const OrderConfirmation = lazy(() => import("./pages/user/orderConfirmation"));
const VerifiedRegister = lazy(() => import("./pages/user/verifiedRegister"));

// admin routes
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Customers_admin = lazy(() => import("./pages/admin/customers_admin"));
const Products_admin = lazy(() => import("./pages/admin/products_admin"));
const UpdateProduct_admin = lazy(() => import("./pages/admin/updateProduct"));
const Orders_admin = lazy(() => import("./pages/admin/orders_admin"));
const Product_admin = lazy(() => import("./pages/admin/product_admin"));
const Transactions_admin = lazy(() =>
  import("./pages/admin/transactions_admin")
);

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* user-route */}
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={!isAuthenticated ? <Signin /> : <Profile />}
          />

          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Profile />}
          />

          <Route
            path="/signup/:id"
            element={!isAuthenticated ? <VerifiedRegister /> : <Profile />}
          />

          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Signin />}
          />
          <Route
            path="/profile/update"
            element={isAuthenticated ? <UpdateProfile /> : <Signin />}
          />
          <Route
            path="/profile/password"
            element={isAuthenticated ? <UpdatePassword /> : <Signin />}
          />
          <Route
            path="/profile/orders"
            element={isAuthenticated ? <Orders /> : <Signin />}
          />
          <Route
            path="/cart/order-confirmation"
            element={isAuthenticated ? <OrderConfirmation /> : <Signin />}
          />
          <Route
            path="/wishlist"
            element={isAuthenticated ? <Wishlist /> : <Signin />}
          />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Signin />}
          />

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search/:keyword" element={<Products />} />
          <Route path="/products/:gender" element={<Products />} />
          <Route path="/products/:gender/:category" element={<Products />} />
          <Route path="/products/newandfeatured" element={<Products />} />
          <Route path="/products/sale" element={<Products />} />
          <Route path="/products/:gender/:category/:id" element={<Product />} />

          {/* admin-route */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/orders" element={<Orders_admin />} />
          <Route path="/admin/customers" element={<Customers_admin />} />
          <Route path="/admin/products" element={<Products_admin />} />
          <Route path="/admin/transactions" element={<Transactions_admin />} />
          <Route path="/admin/product/create" element={<Product_admin />} />
          <Route path="/admin/product/:id" element={<UpdateProduct_admin />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
