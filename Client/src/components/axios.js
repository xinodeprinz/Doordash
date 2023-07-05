import axios from "axios";
import sweetAlert from "./SweetAlert";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    sweetAlert({ icon: "error", title: "An error occured, please try again." });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    const title = error.response.data.message;
    sweetAlert({ icon: "error", title });
    return Promise.reject(error);
  }
);

export default axiosInstance;
