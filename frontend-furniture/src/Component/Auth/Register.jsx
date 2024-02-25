import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../Redux/Slices/users/usersSlices";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccesMsg from "../Alert/SuccesMsg";

const Register = () => {
  const { user, error } = useSelector((state) => state?.users);
  const navigate = useNavigate();
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
    dispatch(
      registerAction({
        username: formData.username,
        password: formData.password,
        email: formData?.email,
      })
    );
    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };

  useEffect(() => {
    if (user?.status === "OK") {
      navigate("/");
    }
  }, [user?.status, navigate]);

  return (
    <div className="account-column">
      {error && <ErrorMsg message={error?.message} />}
      {user?.status === "registered" && (
        <SuccesMsg message="Kayıt işlemi Başarılı" />
      )}
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
