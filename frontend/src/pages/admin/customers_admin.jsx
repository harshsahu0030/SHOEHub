import Box_admin from "../../components/admin/box_admin";
import Header_admin from "../../components/admin/header_admin";
import Sidebar_admin from "../../components/admin/sidebar_admin";
import Table_admin from "../../components/admin/table_admin";

const Customers_admin = () => {
  return (
    <div className="customers_admin_container">
      <div className="admin_sidebar">
        <Sidebar_admin />
      </div>
      <div className="customers_admin_main">
        <Header_admin />
        <div className="customers_admin_infoBox">
          <Box_admin name="Total Users" />
          <Box_admin name="Active Users" />
          <Box_admin name="Inactive Users" />
          <Box_admin name="Online Users" />
        </div>
        <hr />
        <div className="customers_admin_table">
          <Table_admin
            tableHead={[
              "S.no",
              "Customer ID",
              "Custmer Name",
              "Custmer Email",
              "Customer Phone No.",
              "Customize",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Customers_admin;
