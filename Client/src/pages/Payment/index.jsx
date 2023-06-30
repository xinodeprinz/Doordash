import { FaDollarSign, FaPhoneAlt } from "react-icons/fa";
import Layout from "../../components/Layout";
import "./styles.css";
import MTN from "../../images/mtn.png";
import Orange from "../../images/orange.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "../../components/axios";
import sweetAlert from "../../components/SweetAlert";

const Payment = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ amount: null });

  const handleInput = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const processPayment = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const type = user?.type === "client" ? "deposit" : "withdraw";
      const res = await axios.post(`/${type}`, data);
      sweetAlert({ icon: "success", title: res.data.message });
      return setInterval(() => {
        window.location.pathname = "/home";
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const ProcessingButton = () => (
    <div className="d-flex justify-content-center text-white">
      <div className="spinner-grow" role="status"></div>
      <span className="ms-1">Processing...</span>
    </div>
  );

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="col-12">
                <div className="section-title">
                  <h1>{user?.type === "client" ? "deposit" : "withdrawal"}</h1>
                </div>
                <hr />
              </div>
              <div className="col-12">
                <div className="row mb-4">
                  <div className="col-6">
                    <img src={MTN} alt="MTN" className="banner" />
                  </div>
                  <div className="col-6">
                    <img src={Orange} alt="Orange" className="banner" />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-body">
                    <form onSubmit={processPayment}>
                      <div className="mb-3">
                        <div className="a-balance">
                          account balance: <span>{user?.balance} XAF</span>
                        </div>
                      </div>
                      <div className="input-group input-group-lg mb-3">
                        <div className="input-group-text">
                          <FaPhoneAlt className="icon" />
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Phone"
                          value={user?.phone}
                          disabled
                        />
                      </div>
                      <div className="input-group input-group-lg mb-3">
                        <div className="input-group-text">
                          <FaDollarSign className="icon" />
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Amount"
                          id="amount"
                          onChange={handleInput}
                        />
                      </div>
                      <button
                        className="btn btn-main w-100 btn-lg"
                        disabled={loading}
                      >
                        {loading ? <ProcessingButton /> : " Process"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
