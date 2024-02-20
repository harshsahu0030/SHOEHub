import PropTypes from "prop-types";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { useNavigate } from "react-router-dom";

const Table_admin = ({ tableHead, data }) => {
  const navigate = useNavigate();
  return (
    data && (
      <table className="table_admin_container">
        <thead>
          <tr>
            {tableHead &&
              tableHead.map((item, index) => <th key={index}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item._id}</td>
              <td>
                {item.title.length > 20
                  ? `${item.title.slice(0, 15)}...`
                  : item.title}
              </td>
              <td>
                {item.brand.length > 20
                  ? `${item.brand.slice(0, 15)}...`
                  : item.brand}
              </td>

              {item.stock >= 5 ? (
                <td style={{ color: "green" }}>{item.stock}</td>
              ) : (
                <td style={{ color: "red" }}>{item.stock}</td>
              )}

              {item.action === "active" ? (
                <td style={{ color: "green" }}>{item.action}</td>
              ) : (
                <td style={{ color: "red" }}>{item.action}</td>
              )}
              <td>
                <EditNoteOutlinedIcon
                  onClick={() => navigate(`/admin/product/${item._id}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

Table_admin.propTypes = {
  tableHead: PropTypes.array,
  data: PropTypes.array,
};

export default Table_admin;
