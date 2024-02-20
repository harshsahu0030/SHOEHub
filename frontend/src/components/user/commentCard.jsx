import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import PropTypes from "prop-types";

const CommentCard = ({ comment }) => {
  return (
    <div className="commentCard_container">
      <div className="commentCard_top">
        <h5>{comment.name}</h5>
        <div>
          {[...Array(Number(comment.rating))].map((_, index) => {
            index += 1;
            return <StarRateIcon key={index} />;
          })}
        </div>
      </div>
      <div className="commentCard_center">{comment.comment}</div>
      <div className="commentCard_bottom">
        <p>{comment.createdAt}</p>
        <div>
          <ThumbUpAltOutlinedIcon />
          <ThumbDownOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object,
};

export default CommentCard;
