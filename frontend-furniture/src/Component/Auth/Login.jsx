import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../Redux/Slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccesMsg from "../Alert/SuccesMsg";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "12345",
    username: "seyit",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //!dispatch
    dispatch(
      loginAction({
        username: formData.username,
        password: formData.password,
      })
    );
    // reset form
    setFormData({
      password: "",
      username: "",
    });
  };
  //store data
  const { userAuth, loading, error, isLogin } = useSelector(
    (state) => state?.users
  );

  //Redirect if token expired
  useEffect(() => {
    if (error?.message === "Token expired/Invalid") {
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  }, [navigate, error?.message]);

  //! Redirect
  useEffect(() => {
    if (
      userAuth?.userInfo?.token &&
      error?.message !== "Token expired/Invalid"
    ) {
      navigate("/");
    }
  }, [navigate, userAuth?.userInfo?.token]);

  return (
    <div className="account-column">
      {/* Display error */}
      {error && <ErrorMsg message={error?.message} />}
      {/* success message */}
      {isLogin && <SuccesMsg message="Login Success" />}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input type="text" name="email" required onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              required
              name="password"
              type="password"
              onChange={handleChange}
            />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="btn btn-sm">Login</button>
        </p>
        <a href="#" className="form-link">
          Lost your password?
        </a>
      </form>
    </div>
  );
};

export default Login;
