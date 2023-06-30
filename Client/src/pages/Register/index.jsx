import "./styles.css";
import {
  FaAddressBook,
  FaEnvelope,
  FaGoogle,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import towns from "../../data/towns";
import Logo from "../../images/doordash.png";
import axios from "../../components/axios";
import sweetAlert from "../../components/SweetAlert";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

const Register = () => {
  const navigate = useNavigate();
  const types = ["client", "vendor"];
  const [data, setData] = useState({
    type: types[0],
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const register = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/register", data);
      sweetAlert({ icon: "success", title: res.data.message });
      navigate("/login");
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <div className="background">
      <div className="center">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="text-center mb-4">
                <img src={Logo} alt="Logo" />
              </div>
              <div className="card shadow">
                <div className="card-header text-center">Register</div>
                <div className="card-body">
                  <ul className="nav nav-pills nav-justified mb-4">
                    {types.map((type, key) => (
                      <button
                        className={`nav-link text-capitalize ${
                          data.type === type ? "active" : ""
                        }`}
                        onClick={() => setData({ ...data, type })}
                        key={key}
                      >
                        {type}
                      </button>
                    ))}
                  </ul>
                  <form onSubmit={register}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="input-group input-group-lg">
                          <div className="input-group-text">
                            <FaUser className="icon" />
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            id="name"
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="input-group input-group-lg">
                          <div className="input-group-text">
                            <FaEnvelope className="icon" />
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            id="email"
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="input-group input-group-lg">
                          <div className="input-group-text">
                            <FaPhoneAlt className="icon" />
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Phone"
                            id="phone"
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="input-group input-group-lg">
                          <div className="input-group-text">
                            <FaAddressBook className="icon" />
                          </div>
                          <select
                            className="form-select"
                            id="address"
                            onChange={handleInput}
                          >
                            <option value="">Select Address...</option>
                            {towns.map((town, key) => (
                              <option
                                value={town}
                                key={key}
                                className="text-capitalize"
                              >
                                {town}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="input-group input-group-lg mb-3">
                      <div className="input-group-text">
                        <FaLock className="icon" />
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        id="password"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="accept"
                        style={{ cursor: "pointer" }}
                      />
                      <label className="form-check-label" htmlFor="accept">
                        I accept the terms and conditions
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-md-8 offset-md-2">
                        <button className="btn btn-main w-100 btn-lg">
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="text-center mt-2">
                    <span>Already have an account?</span>
                    <Link to={"/login"} className="btn btn-link">
                      Login
                    </Link>
                    <div>OR</div>
                    <div className="row">
                      <div className="col-md-8 offset-md-2">
                        {/* <button className="btn btn-google btn-lg">
                          <FaGoogle />
                          <span className="ms-1">Sign up with Google</span>
                        </button> */}
                        <GoogleLogin
                          clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                          buttonText="Sign up with Google"
                          onSuccess={(res) => console.log(res)}
                          onFailure={(err) => console.log(err)}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
