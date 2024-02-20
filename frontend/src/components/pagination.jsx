import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

const PaginationCom = ({ products, resultPerPage, setPage }) => {
  return (
    <Stack className="paginationCom_container" spacing={2}>
      <Pagination
        count={Math.ceil(products / resultPerPage)}
        onClick={(e) => setPage(e.target.innerText)}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

PaginationCom.propTypes = {
  products: PropTypes.array,
  resultPerPage: PropTypes.number,
  setPage: PropTypes.func,
};

export default PaginationCom;
