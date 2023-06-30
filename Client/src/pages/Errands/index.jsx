import Layout from "../../components/Layout";
import "./styles.css";
import axios from "../../components/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Errands = () => {
  const [errands, setErrands] = useState([]);
  useEffect(() => {
    getErrands();
  }, []);

  const getErrands = async () => {
    try {
      const res = await axios.get("/errands");
      setErrands(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="section-title">
        <h1>errands</h1>
      </div>
      <div className="row errands">
        {errands.map((errand, key) => (
          <div className="col-md-6 col-lg-3 mb-3" key={key}>
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
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Errands;
