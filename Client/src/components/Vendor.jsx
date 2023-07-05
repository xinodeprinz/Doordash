import "../pages/Users/styles.css";
import Empty from "../images/empty.jpg";
import Modal from "./Modal";
import { useState } from "react";

const Vendor = ({ vendor }) => {
  const showModal = () => {
    document.getElementById("modalBtn")?.click();
  };

  return (
    <>
      <Modal vendor={vendor} />
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
          <button
            className="btn btn-sec w-100 chat"
            onClick={() => showModal()}
          >
            continue
          </button>
        </div>
      </div>
    </>
  );
};

export default Vendor;
