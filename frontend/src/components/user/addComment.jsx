import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useEffect, useState } from "react";
import CommentCard from "./commentCard";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addAndupdateProductReviewAction,
  getProductAction,
} from "../../actions/user/productAction";
import { useAlert } from "react-alert";

const AddComment = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, message, error } = useSelector(
    (state) => state.productReview
  );

  const handleClick = (getCurrentIndex) => {
    setRating(getCurrentIndex);
  };

  const handleMouseEnter = (getCurrentIndex) => {
    setHover(getCurrentIndex);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addAndupdateProductReviewAction(product._id, rating, comment)
    );
    await dispatch(getProductAction(product._id));
  };

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      alert.error(error);

      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, message, error, alert]);

  return (
    <div className="addComment_container">
      <div className="addComment_wrapper01">
        <h3>
          ADD COMMENT <AddCommentOutlinedIcon />
        </h3>
        <div className="form-container" onSubmit={handleSubmit}>
          <form className="form">
            <div className="form_star">
              {[...Array(5)].map((_, index) => {
                index += 1;

                return (
                  <StarRateIcon
                    key={index}
                    className={
                      index <= (hover || rating) ? "active" : "inactive"
                    }
                    onClick={() => handleClick(index)}
                    onMouseMove={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                    size={40}
                  />
                );
              })}
            </div>
            <div className="form-group">
              <label htmlFor="textarea">Add Your Comment Here</label>
              <textarea
                required=""
                cols="50"
                rows="10"
                id="textarea"
                name="textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="form-submit-btn"
              disabled={loading}
            >
              ADD COMMENT
            </button>
          </form>
        </div>
      </div>
      <div className="addComment_wrapper02">
        <h3>
          COMMENTS <CommentOutlinedIcon />
        </h3>
        <div>
          {product &&
            product.reviews.map((item) => (
              <CommentCard key={item._id} comment={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

AddComment.propTypes = {
  product: PropTypes.object,
};

export default AddComment;
