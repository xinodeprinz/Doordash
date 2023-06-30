import { useState } from "react";
import {
  FaAddressBook,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import towns from "../../data/towns";
import "./styles.css";
import axios from "../../components/axios";
import sweetAlert from "../../components/SweetAlert";

const Profile = () => {
  const initialUser = useSelector((state) => state.user);
  const [user, setUser] = useState({
    name: initialUser?.name,
    email: initialUser?.email,
    phone: initialUser?.phone,
    address: initialUser?.address,
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const updateProfile = async (e) => {
    try {
      e.preventDefault();
      const { email, phone, ...rest } = user;
      const res = await axios.patch("/user/update", rest);
      sweetAlert({ icon: "success", title: res.data.message });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row my-profile">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow">
            <div className="card-header text-center">Profile</div>
            <div className="card-body">
              <form onSubmit={updateProfile}>
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
                        value={user.name}
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
                        defaultValue={user.email}
                        disabled
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
                        defaultValue={user.phone}
                        disabled
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
                        value={user.address}
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
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>

                <div className="row">
                  <div className="col-md-8 offset-md-2">
                    <button className="btn btn-main w-100 btn-lg">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
