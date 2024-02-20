import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const Header_admin = () => {
  return (
    <>
      <header className="header_admin_container">
        <div className="header_admin_input">
          <input type="text" placeholder="Search id, name, category ..." />
          <SearchIcon />
        </div>
        <div className="header_admin_links">
          <NotificationsNoneIcon />
          <PersonIcon />
        </div>
      </header>
      <hr />
    </>
  );
};

export default Header_admin;
