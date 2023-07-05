import Layout from "../../components/Layout";
import "./styles.css";
import axios from "../../components/axios";
import { useEffect, useState } from "react";
import Errand from "../../components/Errand";

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
            <Errand errand={errand} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Errands;
