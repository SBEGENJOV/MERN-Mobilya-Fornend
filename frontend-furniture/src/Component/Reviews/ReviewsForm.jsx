import { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../Redux/Slices/comments/commentsSlice";

const ReviewsForm = ({ singleProduct }) => {
  const [review, setReview] = useState("");
  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const { productId } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Yeni yorum nesnesini oluştur
    const newComment = {
      message: review,
      user: user.id || user._id,
      productId:productId
    };

    // Yorumu formData'ya ekleyerek oluşturulan yorumlar dizisine ekleyin
    const formData = {
      comments: [...singleProduct.product.comments, newComment],
    };

    // Yorumu oluşturmak için productId'yi alın

    // Yeni yorumu oluşturmak için eylemi çağırın
    dispatch(createCommentAction(formData));
    console.log(formData);
    // Bildirimi göster
    message.success("Yorum eklendi");

    // Yorumu temizle
    setReview("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
       E-posta hesabınız yayımlanmayacak.Gerekli alanlar işaretlendi
        <span className="required">*</span>
      </p>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          required
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        ></textarea>
      </div>
      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Bir dahaki sefere bu tarayıcıda adımı, e -postamı ve web sitemi kaydedin
          Yorum.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
};

export default ReviewsForm;

ReviewsForm.propTypes = {
  singleProduct: PropTypes.object,
};
