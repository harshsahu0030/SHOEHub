import { useEffect } from "react";
import Box_admin from "../../components/admin/box_admin";
import Header_admin from "../../components/admin/header_admin";
import Sidebar_admin from "../../components/admin/sidebar_admin";
import Table_admin from "../../components/admin/table_admin";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAction } from "../../actions/user/productAction";

const Products_admin = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.getAllProducts);

  useEffect(() => {
    dispatch(getAllProductAction());
  }, [dispatch]);

  return (
    <div className="products_admin_container">
      <div className="admin_sidebar">
        <Sidebar_admin />
      </div>
      <div className="products_admin_main">
        <Header_admin />
        <div className="products_admin_infoBox">
          <Box_admin name="Total Products" data={products} />
          <Box_admin name="Active Products" data={products} />
          <Box_admin name="Disabled Products" data={products} />
          <Box_admin url="/admin/product/create" name="Create New Products" />
        </div>
        <hr />

        <div className="products_admin_table">
          <Table_admin
            tableHead={[
              "S.no",
              "Product ID",
              "Product Name",
              "Brand Name",
              "Stock",
              "Action",
              "Customize",
            ]}
            data={products}
          />
        </div>
      </div>
    </div>
  );
};

export default Products_admin;
