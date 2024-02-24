import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../Redux/Slices/users/usersSlices";
import { Navigate } from "react-router-dom";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccesMsg from "../Alert/SuccesMsg";

const Register = () => {
  //store data
  const { user, error, isRegistered, loading } = useSelector(
    (state) => state?.users
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //!dispatch
    dispatch(
      registerAction({
        username: formData.username,
        password: formData.password,
        email: formData?.email,
      })
    );
    // reset form
    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };

  //! Redirect
  useEffect(() => {
    if (user?.status === "OK") {
      Navigate("/login");
    }
  }, [user?.status]);

  return (
    <div className="account-column">
      {/* Display error */}
      {error && <ErrorMsg message={error?.message} />}
      {/* success message */}
      {isRegistered && <SuccesMsg message="Kayıt işlemi Başarılı" />}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input
              name="username"
              required
              onChange={handleInputChange}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input
              name="email"
              required
              onChange={handleInputChange}
              type="email"
            />
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
              onChange={handleInputChange}
              type="password"
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
