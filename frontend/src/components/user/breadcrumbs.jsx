import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs_container">
      <Link to="/"> Home </Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={breadcrumbPath}>{`/ ${name
            .split("%20")
            .join(" ")} `}</span>
        ) : (
          <span key={breadcrumbPath}>
            <Link to={breadcrumbPath}>{`/ ${name
              .split("%20")
              .join(" ")} `}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
