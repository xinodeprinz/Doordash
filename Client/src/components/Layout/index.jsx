import "./styles.css";
import Empty from "../../images/empty.jpg";
import Logo from "../../images/doordash.png";
import {
  FaCheck,
  FaClock,
  FaComment,
  FaDollarSign,
  FaHome,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import sweetAlert from "../SweetAlert";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../components/axios";
import { clearUser, setUser as setStoreUser } from "../../redux/userSlice";

const Layout = ({ children }) => {
  const [user, setUser] = useState(useSelector((state) => state.user));
  const [time, setTime] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);

  const path = window.location.pathname.split("/").pop();

  const handleProfile = async (e) => {
    try {
      const photo = e.target.files[0];
      const type = photo.type.split("/").shift();
      if (type !== "image") {
        return sweetAlert({ icon: "error", title: "Please upload an image." });
      }
      const url = URL.createObjectURL(photo);
      const photoImg = document.getElementById("profile");
      photoImg.src = url;

      // Send image to the server
      const formData = new FormData();
      formData.append("photo", photo);
      const res = await axios.patch("/photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      sweetAlert({ icon: "success", title: res.data.message });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) getUser();

    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("/user");
      setUser(res.data);
      // Update the user in the store
      dispatch(setStoreUser(res.data));
    } catch (error) {
      cleanStorage();
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get("/logout");
      sweetAlert({ icon: "success", title: res.data.message });
      cleanStorage();
    } catch (error) {
      console.log(error);
    }
  };

  const cleanStorage = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="row g-0">
      <div className="col-lg-3 col-xl-2">
        <aside className="sidebar py-4">
          <div className="container">
            <div className="logo-main">
              <img src={Logo} alt="Logo" className="logo" />
            </div>
            <hr />
            <div className="text-center">
              <div className="position-relative">
                <img
                  src={
                    user?.photo
                      ? `${process.env.REACT_APP_BASE_URL}/${user?.photo}`
                      : Empty
                  }
                  alt="Kayla Naomi"
                  id="profile"
                  className="profile"
                />
                <div className="check">
                  <FaCheck
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      document.getElementById("photoInput")?.click()
                    }
                  />
                  <input
                    type="file"
                    id="photoInput"
                    onChange={handleProfile}
                    hidden
                  />
                </div>
              </div>
              <div className="my-2">
                <h4 className="text-capitalize">{user?.name}</h4>
                <Link className="btn btn-sec manage px-5" to={"/profile"}>
                  manage
                </Link>
              </div>
            </div>
            <div className="mt-4 links">
              <div>
                <Link
                  className={`link ${path === "home" ? "active" : ""}`}
                  to={"/home"}
                >
                  <FaHome />
                  <span>Dashboard</span>
                </Link>
              </div>
              <div>
                <Link
                  className={`link ${path === "errands" ? "active" : ""}`}
                  to={"/errands"}
                >
                  <FaTasks />
                  <span>Errands</span>
                </Link>
              </div>
              {user?.type === "client" && (
                <div>
                  <Link
                    className={`link ${path === "users" ? "active" : ""}`}
                    to={"/users"}
                  >
                    <FaUsers />
                    <span>Vendors</span>
                  </Link>
                </div>
              )}
              <div>
                <Link
                  className={`link ${path === "chats" ? "active" : ""}`}
                  to={"/chats"}
                >
                  <FaComment />
                  <span>Chats</span>
                </Link>
              </div>
              <div>
                <Link
                  className={`link ${path === "transactions" ? "active" : ""}`}
                  to={"/transactions"}
                >
                  <FaDollarSign />
                  <span>Transactions</span>
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div className="col-lg-9 col-xl-10">
        <div className="dash-margin mb-4 mx-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="input-group input-group-lg search">
              <div className="input-group-text shadow">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="form-control me-lg-5 shadow"
              />
            </div>
            <div className="time">
              <FaClock />
              <span className="ms-2">
                {time.toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <button
              className="btn btn-outline-main btn-lg logout px-4"
              onClick={logout}
            >
              <FaSignOutAlt />
              <span className="ms-1">Logout</span>
            </button>
          </div>
          <hr />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
