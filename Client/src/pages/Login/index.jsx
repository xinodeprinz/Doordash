import "./styles.css";
import { FaGoogle, FaLock, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/doordash.png";
import sweetAlert from "../../components/SweetAlert";
import axios from "../../components/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const login = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/login", data);
      localStorage.setItem("token", res.data.token);
      dispatch(setUser(res.data.user));
      sweetAlert({ icon: "success", title: res.data.message });
      navigate("/home");
    } catch (error) {
      console.log(e);
    }
  };
  return (
    <div className="background">
      <div className="center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              <div className="text-center mb-4">
                <img src={Logo} alt="Logo" />
              </div>
              <div className="card shadow">
                <div className="card-header text-center">Login</div>
                <div className="card-body">
                  <form onSubmit={login}>
                    <div className="input-group input-group-lg mb-3">
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
                        id="remember"
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <button className="btn btn-main w-100 btn-lg">Login</button>
                  </form>
                  <div className="text-center mt-2">
                    <span>Don't have an account?</span>
                    <Link to={"/register"} className="btn btn-link">
                      Register
                    </Link>
                    <div>OR</div>
                    <button className="btn btn-google btn-lg">
                      <FaGoogle />
                      <span className="ms-1">Sign in with Google</span>
                    </button>
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

export default Login;
