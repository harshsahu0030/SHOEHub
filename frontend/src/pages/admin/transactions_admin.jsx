import Box_admin from "../../components/admin/box_admin";
import Header_admin from "../../components/admin/header_admin";
import Sidebar_admin from "../../components/admin/sidebar_admin";
import Table_admin from "../../components/admin/table_admin";

const Transactions_admin = () => {
  return (
    <div className="transactions_admin_container">
      <div className="admin_sidebar">
        <Sidebar_admin />
      </div>
      <div className="transactions_admin_main">
        <Header_admin />
        <div className="transactions_admin_infoBox">
          <Box_admin name="Today's Transactions" />
          <Box_admin name="Successful Transactions" />
          <Box_admin name="Pending Transactions" />
          <Box_admin name="Total Transactions" />
        </div>
        <hr />
        <div className="transactions_admin_table">
          <Table_admin
            tableHead={[
              "S.no",
              "Transaction ID",
              "Order Id",
              "Customer Id",
              "Value (in rs.)",
              "Date",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions_admin;
