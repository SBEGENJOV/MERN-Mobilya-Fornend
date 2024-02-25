import { useEffect } from "react";
import "./Reviews.css";
import ReviewsForm from "./ReviewsForm";
import ReviewsItem from "./ReviewsItem";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { userPrivateProfileAction } from "../../Redux/Slices/users/usersSlices";

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
  const dispatch = useDispatch();
  const { userAuth, profile } = useSelector((state) => state?.users);
  const { products } = useSelector((state) => state?.products);
  const userId = userAuth?.userInfo?._id;
  useEffect(() => {
    dispatch(userPrivateProfileAction(userId));
  }, [dispatch, userId]);
  const thisReview = [];

  singleProduct?.product &&
    products?.product?.comments?.forEach((review) => {
      if (profile?.user?._id === review.user) {
        thisReview.push({
          review: review,
          user: profile.user, // veya isterseniz review.user kullanabilirsiniz
        });
      }
    });
  console.log(products?.product?.comments);
  return (
    <div className={`tab-panel-reviews ${active}`}>
      {products?.product?.comments.length > 0 ? (
        <>
          <h3>Yorumlar</h3>
          <div className="comments">
            <ol className="comment-list">
              {products?.product?.comments.map((item, index) => (
                <ReviewsItem key={index} commentItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>Hiç yorum yok...</h3>
      )}
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewsForm
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  active: PropTypes.string,
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
