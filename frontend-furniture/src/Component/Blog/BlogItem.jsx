import "./BlogItem.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(blog.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <li className="blog-item">
      <a href="#" className="blog-image">
        <img src={blog.img} alt="" />
      </a>
      <div className="blog-info">
        <div className="blog-info-top">
          <time>{formattedDate}</time>
        </div>
        <div className="blog-info-center">
          <a href="#">{blog.title}</a>
        </div>
        <div className="blog-info-bottom">
          <Link to={`/blog/${blog._id}`}>Devamı İçin Tıkla</Link>
        </div>
      </div>
    </li>
  );
};

export default BlogItem;

BlogItem.propTypes = {
  blog: PropTypes.object,
};
