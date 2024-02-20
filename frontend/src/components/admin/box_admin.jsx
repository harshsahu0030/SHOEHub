import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Box_admin = ({ name, url }) => {
  const navigate = useNavigate();

  return (
    <div className="box_admin" onClick={() => navigate(url)}>
      <ShoppingCartOutlinedIcon />
      <div className="box_admin_info">
        <h5>{name}</h5>
        <h4></h4>
      </div>
    </div>
  );
};
Box_admin.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

export default Box_admin;
