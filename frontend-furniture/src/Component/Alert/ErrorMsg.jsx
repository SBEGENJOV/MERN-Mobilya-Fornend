import { useEffect } from "react";
import Swal from "sweetalert2";
import { resetErrorAction } from "../../Redux/Slices/globalSlice/globalSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: message,
      }).then(() => {
        dispatch(resetErrorAction());
      });
    }
  }, [message, dispatch]);
};

export default ErrorMsg;

ErrorMsg.propTypes = {
  message: PropTypes.string,
};
