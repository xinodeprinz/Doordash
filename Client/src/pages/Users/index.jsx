import Layout from "../../components/Layout";
import "./styles.css";
import Empty from "../../images/empty.jpg";
import towns from "../../data/towns";
import axios from "../../components/axios";
import { useEffect, useState } from "react";

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
              <div className="card shadow h-100">
                <img
                  src={
                    vendor?.photo
                      ? `${process.env.REACT_APP_BASE_URL}/${vendor.photo}`
                      : Empty
                  }
                  alt={vendor?.name}
                  className="card-img-top"
                />
                <div className="card-body text-center text-capitalize">
                  <h4 className="name">{vendor?.name}</h4>
                  <p className="town">{vendor?.address}</p>
                  <button className="btn btn-sec w-100 chat">chat now</button>
                </div>
              </div>
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
