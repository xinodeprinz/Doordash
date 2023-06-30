import Layout from "../../components/Layout";
import "./styles.css";
import Empty from "../../images/empty.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../components/axios";

const Home = () => {
  const user = useSelector((state) => state.user);
  const [popularErrands, setPopularErrands] = useState([]);
  const [popularVendors, setPopularVendors] = useState([]);

  useEffect(() => {
    getPopularErrands();
    if (user?.type === "client") getPopularVendors();
  }, []);

  const getPopularErrands = async () => {
    try {
      const res = await axios.get("/popular-errands");
      setPopularErrands(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPopularVendors = async () => {
    try {
      const res = await axios.get("/popular-vendors");
      setPopularVendors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="balance h-100">
            <h4>account balance</h4>
            <div>{user?.balance} XAF</div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="process h-100">
            <h4>make a {user?.type === "client" ? "deposit" : "withdrawal"}</h4>
            <Link to={"/payment"} className="btn btn-sec mt-1">
              {user?.type === "client" ? "deposit" : "withdraw"} now
            </Link>
          </div>
        </div>
      </div>
      <div className="popular-errands">
        <div className="section-title">
          <h1>popular errands</h1>
        </div>
        {popularErrands.length > 0 && (
          <div className="row errands">
            {popularErrands.map((errand, key) => (
              <div className="col-md-6 col-lg-3 mb-3" key={key}>
                <div className="card shadow h-100">
                  <div className="card-header">{errand.name}</div>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${errand.photo}`}
                    alt={errand.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">{errand.description}</p>
                    <Link className="btn btn-sec w-100 explore" to={"/users"}>
                      explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {user?.type === "client" && popularVendors.length > 0 && (
          <div className="popular-errands">
            <div className="section-title">
              <h1>Vendors in {user.address}</h1>
            </div>
            <div className="row">
              {popularVendors.map((vendor, key) => (
                <div className="col-md-6 col-lg-3 mb-3" key={key}>
                  <div className="card shadow h-100">
                    <img
                      src={
                        vendor.photo
                          ? `${process.env.REACT_APP_BASE_URL}/${vendor.photo}`
                          : Empty
                      }
                      alt={vendor.name}
                      className="card-img-top"
                    />
                    <div className="card-body text-center text-capitalize">
                      <h4 className="name">{vendor.name}</h4>
                      <p className="town">{vendor.address}</p>
                      <button className="btn btn-sec w-100 chat">
                        chat now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
