import { Link, useNavigate } from "react-router-dom";
import LogoDark from "../../assets/logo_dark.png";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useRef, useState } from "react";
import Banner_Img01 from "../../assets/banner_img01.png";
import { categories_admin } from "../../data/admin/category";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [drowndownData, setDrowndownData] = useState([]);
  const [keyword, setkeyword] = useState();
  const [dropGender, setDropGender] = useState();
  const { isAuthenticated } = useSelector((state) => state.user);
  const ref = useRef();

  const handleOpenHoverDropdown = () => {
    ref.current.style.height = "50vh";
    ref.current.style.display = "grid";
  };

  const handleCloseHoverDropdown = () => {
    ref.current.style.height = "0vh";
    ref.current.style.display = "none";
  };

  const handleKeyword = () => {
    navigate(`/search/${keyword}`);
  };

  const handledDropdown = (value) => {
    if (value !== "") {
      setDropGender(value);
      handleOpenHoverDropdown();
      setDrowndownData(
        categories_admin &&
          categories_admin.find((item) => item.gender === value).types.sort()
      );
    } else {
      handleCloseHoverDropdown();
    }
  };

  return (
    <nav className="header_container" onMouseLeave={handleCloseHoverDropdown}>
      <div className="header_left">
        <img src={LogoDark} alt="logo" onClick={() => navigate("/")} />
        <ul>
          <li onMouseEnter={() => handledDropdown("")}>
            <Link to="/products/newandfeatured">New & Featured</Link>
          </li>
          <li onMouseEnter={() => handledDropdown("men")}>
            <Link to="/products/men">Men</Link>
          </li>
          <li onMouseEnter={() => handledDropdown("women")}>
            <Link to="/products/women">Women</Link>
          </li>
          <li onMouseEnter={() => handledDropdown("unisex")}>
            <Link to="/products/unisex">Unisex</Link>
          </li>
          <li onMouseEnter={() => handledDropdown("")}>
            <Link to="/products/sale">Sale</Link>
          </li>
        </ul>
      </div>
      <div className="header_right">
        <div className="header_search">
          <SearchIcon onClick={handleKeyword} />
          <input
            type="text"
            placeholder="Search for products..."
            value={keyword}
            onChange={(e) => setkeyword(e.target.value)}
          />
        </div>
        <div className="header_icons">
          <FavoriteBorderIcon
            onClick={() =>
              isAuthenticated === true
                ? navigate("/wishlist")
                : navigate("/signin")
            }
          />
          <WorkOutlineIcon
            onClick={() =>
              isAuthenticated === true ? navigate("/cart") : navigate("/signin")
            }
          />
          <PersonOutlineIcon
            onClick={() =>
              isAuthenticated === true
                ? navigate("/profile")
                : navigate("/signin")
            }
          />
        </div>
      </div>
      <div className="header_dropdown" ref={ref}>
        <div className="header_dropdown_left">
          <img src={Banner_Img01} alt="img" />
        </div>
        <div className="header_dropdown_right">
          <ul>
            {drowndownData &&
              drowndownData.map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={handleCloseHoverDropdown}
                    to={`/products/${dropGender}/${item}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
