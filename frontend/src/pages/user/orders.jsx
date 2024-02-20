import Footer from "../../components/footer";
import Breadcrumbs from "../../components/user/breadcrumbs";
import Header from "../../components/user/header";

const Orders = () => {
  return (
    <div className="orderConfirmation_container">
      <Header />
      <Breadcrumbs />
      <div className="orderConfirmation_wrapper"> </div>
      <Footer />
    </div>
  );
};

export default Orders;
