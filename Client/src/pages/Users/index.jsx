import Layout from "../../components/Layout";
import "./styles.css";
import towns from "../../data/towns";
import axios from "../../components/axios";
import { useEffect, useState } from "react";
import Vendor from "../../components/Vendor";

const Users = () => {
  const [vendors, setVendors] = useState([]);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    getVendors();
  }, [category]);

  const getVendors = async () => {
    try {
      const res = await axios.get(`/vendors/${category}`);
      setVendors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <div className="section-title">
          <h1>{category === "all" ? "vendors" : `vendors in ${category}`}</h1>
        </div>
        <select
          className="filter"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Category: All</option>
          {towns.map((town, key) => (
            <option value={town} key={key}>
              {town}
            </option>
          ))}
        </select>
      </div>
      {vendors.length > 0 ? (
        <div className="row">
          {vendors.map((vendor, key) => (
            <div className="col-md-6 col-lg-3 mb-3" key={key}>
              <Vendor vendor={vendor} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert text-center alert-info">
          There are no vendors in the town of {category}.
        </div>
      )}
    </Layout>
  );
};

export default Users;
