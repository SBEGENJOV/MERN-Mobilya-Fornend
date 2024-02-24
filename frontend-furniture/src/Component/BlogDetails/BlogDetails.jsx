import { useParams } from "react-router-dom";
import "./BlogDetails.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogAction } from "../../Redux/Slices/blog/blogSlice";

const BlogDetails = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state?.blog);
  useEffect(() => {
    dispatch(getBlogAction(blogId));
  }, [dispatch, blogId]);

  return (
    <section className="single-blog">
      <div className="container">
        <article>
          <figure>
            <a href="#">
              <img src={blogs?.blog?.img} alt="" />
            </a>
          </figure>
          <div className="blog-wrapper">
            <h1
              style={{ textAlign: "center", fontSize: "5rem" }}
              className="blog-title"
            >
              {blogs?.blog?.title}
            </h1>
            <div className="blog-content">
              <p style={{ textAlign: "center", fontSize: "1rem" }}>
                {blogs?.blog?.desc}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetails;
