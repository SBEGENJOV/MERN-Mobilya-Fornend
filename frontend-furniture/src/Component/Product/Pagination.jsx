import "./Pagination.css";
import PropTypes from "prop-types";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div id="PageID">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Önceki Sayfa
      </button>
      <span>
        Sayfa {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sonraki Sayfa
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};
