import Box_admin from "../../components/admin/box_admin";
import Header_admin from "../../components/admin/header_admin";
import Sidebar_admin from "../../components/admin/sidebar_admin";
import Table_admin from "../../components/admin/table_admin";

const Orders_admin = () => {
  return (
    <div className="orders_admin_container">
      <div className="admin_sidebar">
        <Sidebar_admin />
      </div>
      <div className="orders_admin_main">
        <Header_admin />
        <div className="orders_admin_infoBox">
          <Box_admin name="Processing Orders" />
          <Box_admin name="Delivered Orders" />
          <Box_admin name="Returened Prders" />
          <Box_admin name="Total Orders" />
        </div>
        <hr />

        <div className="orders_admin_table">
          <Table_admin
            tableHead={[
              "S.no",
              "Oders ID",
              "Customer ID",
              "Value (in Rs.)",
              "Order Status",
              "Customize",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders_admin;
