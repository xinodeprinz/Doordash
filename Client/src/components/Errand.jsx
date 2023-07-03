import "../pages/Errands/styles.css";
import { Link } from "react-router-dom";

const Errand = ({ errand }) => {
  return (
    <div className="card shadow h-100">
      <div className="card-header">{errand?.name}</div>
      <img
        src={`${process.env.REACT_APP_BASE_URL}/${errand?.photo}`}
        alt={errand?.name}
        className="card-img-top"
      />
      <div className="card-body">
        <p className="card-text">{errand?.description}</p>
        <Link to={"/users"} className="btn btn-sec w-100 explore">
          explore
        </Link>
      </div>
    </div>
  );
};

export default Errand;
