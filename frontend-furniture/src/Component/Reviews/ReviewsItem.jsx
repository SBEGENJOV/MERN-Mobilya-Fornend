import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ReviewsItem = ({ commentItem }) => {
  console.log(commentItem);
  const { products } = useSelector((state) => state?.products);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const latestComment =
    products?.product?.comments[products?.product?.comments.length - 1];
  const formattedDate = new Date(latestComment?.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <li className="comment-item">
      <div className="comment-text">
        <div className="comment-meta">
          <strong> {commentItem?.author?.username}</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{commentItem?.message}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewsItem;

ReviewsItem.propTypes = {
  commentItem: PropTypes.object,
};
