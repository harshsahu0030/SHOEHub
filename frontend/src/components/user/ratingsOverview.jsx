import StarRateIcon from "@mui/icons-material/StarRate";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import PropTypes from "prop-types";

const RatingsOverview = ({ product }) => {
  return (
    <div className="ratingsOverview_container">
      <div className="ratingsOverview_boxOne">
        <h3>
          RATINGS <AutoAwesomeOutlinedIcon />
        </h3>
        <div>
          <h2>
            {product.ratings} <StarRateIcon />
          </h2>
          <p>out of 5 stars</p>
          <p>{product.reviews.length} Total Reviews</p>
        </div>
      </div>

      <div className="ratingsOverview_boxSeconed">
        <div className="skill-box">
          <span className="title">
            5 <StarRateIcon />
          </span>

          <div className="skill-bar">
            <span className="skill-per seventy">
              <span className="tooltip">70%</span>
            </span>
          </div>
        </div>

        <div className="skill-box">
          <span className="title">
            4 <StarRateIcon />
          </span>

          <div className="skill-bar">
            <span className="skill-per eighty">
              <span className="tooltip">80%</span>
            </span>
          </div>
        </div>

        <div className="skill-box">
          <span className="title">
            3 <StarRateIcon />
          </span>
          <div className="skill-bar">
            <span className="skill-per fifty">
              <span className="tooltip">50%</span>
            </span>
          </div>
        </div>
        <div className="skill-box">
          <span className="title">
            2 <StarRateIcon />
          </span>
          <div className="skill-bar">
            <span className="skill-per thirty">
              <span className="tooltip">30%</span>
            </span>
          </div>
        </div>
        <div className="skill-box">
          <span className="title">
            1 <StarRateIcon />
          </span>
          <div className="skill-bar">
            <span className="skill-per twenty">
              <span className="tooltip">20%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

RatingsOverview.propTypes = {
  product: PropTypes.object,
};

export default RatingsOverview;
