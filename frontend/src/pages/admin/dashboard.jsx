import Box_admin from "../../components/admin/box_admin";
import Header_admin from "../../components/admin/header_admin";
import Sidebar_admin from "../../components/admin/sidebar_admin";

const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <div className="admin_sidebar">
        <Sidebar_admin />
      </div>
      <div className="dashboard_main">
        <Header_admin />
        <div className="dashboard_infoBox">
          <Box_admin name="New Orders" />
          <Box_admin name="Total Income" />
          <Box_admin name="Toatal Expenses" />
          <Box_admin name="New Users" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
