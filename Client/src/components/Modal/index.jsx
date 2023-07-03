import "./styles.css";
import { FaComment, FaDollarSign, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { setVendor } from "../../redux/venderSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "../../components/axios";
import sweetAlert from "../SweetAlert";

const Modal = ({ vendor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sendMoney, setSendMoney] = useState(false);
  const [data, setData] = useState({ receiverId: vendor._id, amount: "" });

  const chatVendor = () => {
    dispatch(setVendor(vendor));
    document.getElementById("cancelModal")?.click();
    navigate("/chats");
  };

  const handleSendMoney = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/send-money", data);
      sweetAlert({ icon: "success", title: res.data?.message });
      return setTimeout(() => {
        window.location.pathname = "/home";
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#modal"
        id="modalBtn"
        hidden
      />

      <div className="modal" tabIndex="-1" id="modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <span>Vendor:</span> <span>{vendor?.name}</span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="cancelModal"
              />
            </div>
            <div className="modal-body">
              {!sendMoney && (
                <>
                  <Link className="btn btn-whatsapp" to={vendor?.whatsapp}>
                    <FaWhatsapp />
                    <span className="ms-1">chat on whatsApp</span>
                  </Link>
                  <button className="btn btn-chat" onClick={chatVendor}>
                    <FaComment />
                    <span className="ms-1">chat on platform</span>
                  </button>
                  <button
                    className="btn btn-money"
                    onClick={() => setSendMoney(true)}
                  >
                    <FaDollarSign />
                    <span className="ms-1">Send money</span>
                  </button>
                </>
              )}

              {sendMoney && (
                <>
                  <form onSubmit={handleSendMoney}>
                    <div className="input-group input-group-lg mb-3">
                      <div className="input-group-text">
                        <FaDollarSign />
                      </div>
                      <input
                        type="text"
                        placeholder="Amount"
                        className="form-control"
                        onChange={(e) =>
                          setData({ ...data, amount: e.target.value })
                        }
                        value={data.amount}
                      />
                    </div>
                    <button type="submit" className="btn btn-main">
                      Send
                    </button>
                  </form>
                  <div className="text-end">
                    <button
                      onClick={() => setSendMoney(false)}
                      className="btn btn-link"
                    >
                      Go Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
