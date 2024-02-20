import BlogItem from "./BlogItem";
import "./Blog.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { blogViewAction } from "../../Redux/Slices/blog/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state?.blog);
  useEffect(() => {
    dispatch(blogViewAction());
  }, [dispatch]);
  const firstThreeBlogs = blogs.slice(-3);

  return (
    <section className="blogs">
      <div className="container">
        <div className="section-title">
          <br />
          <h2>Blog Sayfası</h2>
          <p>Öne Çıkan Bloglar</p>
        </div>

        <ul className="blog-list blog-carousel">
          {firstThreeBlogs.map((blog) => (
            <BlogItem key={blog._id} blog={blog} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blogs;
