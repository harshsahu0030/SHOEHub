import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { navigations_admin } from "../../data/admin/navigation";
import { useEffect, useState } from "react";

const Sidebar_admin = () => {
  const [path, setpath] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOutFromAdmin = () => {
    if (confirm("Press OK to go out from Admin-Dashboard") == true) {
      navigate("/");
    }
  };

  useEffect(() => {
    setpath(location.pathname);
  }, [location]);

  return (
    <aside className="sidebar_admin_container">
      <img src={Logo} alt="Logo" onClick={handleOutFromAdmin} />
      <hr />
      <ul>
        <h5>NAVIGATIONS</h5>
        {navigations_admin &&
          navigations_admin.map((item, index) =>
            path && path === item.url ? (
              <li
                className="active"
                key={index}
                onClick={() => navigate(item.url)}
              >
                {item.name}
              </li>
            ) : (
              <li key={index} onClick={() => navigate(item.url)}>
                {item.name}
              </li>
            )
          )}
      </ul>
    </aside>
  );
};

export default Sidebar_admin;
