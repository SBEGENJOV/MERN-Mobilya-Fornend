import "./Dialog.css";
import Proptypes from "prop-types";

const Dialog = ({ isDialogShow, setIsDialogShow }) => {
  const handleCloseDialog = (event) => {
    const checked = event.target.checked;

    localStorage.setItem("dialog", JSON.stringify(!checked));
  };
  return (
    <div className={`modal-dialog ${isDialogShow ? "show" : ""}`}>
      <div className="modal-content">
        <button className="modal-close" onClick={() => setIsDialogShow(false)}>
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-image">
          <img
            style={{ width: "90%", height: "40%" }}
            src="https://images.pexels.com/photos/6580227/pexels-photo-6580227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="popup-wrapper">
          <div className="popup-content">
            <div className="popup-title">
              <h3>Bülten</h3>
            </div>
            <p className="popup-text">
              En Trend Mobilyalar sadece
              <br />
              SB BUTIK de
            </p>
            <form className="popup-form">
              <span>Bu açılır pencereyi tekrar göstermeyin</span>
              <label>
                <input type="checkbox" onChange={handleCloseDialog} />
              </label>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal-overlay"
        onClick={() => setIsDialogShow(false)}
      ></div>
    </div>
  );
};

export default Dialog;

Dialog.propTypes = {
  setIsDialogShow: Proptypes.func,
  isDialogShow: Proptypes.bool,
};
