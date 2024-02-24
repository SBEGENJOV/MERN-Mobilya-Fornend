import { useParams } from "react-router-dom";
import "./CampainDetails.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampainAction } from "../../Redux/Slices/campains/campainsSlice";

const CampainDetails = () => {
  const { campainId } = useParams();
  const dispatch = useDispatch();
  const { campains } = useSelector((state) => state?.campains);
  useEffect(() => {
    dispatch(getCampainAction(campainId));
  }, [dispatch, campainId]);

  return (
    <section className="single-blog">
      <div className="container">
        <article>
          <figure>
            <a href="#">
              <img src={campains?.campains?.img} alt="" />
            </a>
          </figure>
          <div className="blog-wrapper">
            <h1
              style={{ textAlign: "center", fontSize: "5rem" }}
              className="blog-title"
            >
              {campains?.campains?.title}
            </h1>
            <div className="blog-content">
              <p style={{ textAlign: "center", fontSize: "1rem" }}>
                {campains?.campains?.desc}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CampainDetails;
