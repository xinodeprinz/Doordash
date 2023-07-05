import Layout from "../../components/Layout";
import "./styles.css";
import Empty from "../../images/empty.jpg";
import { FaPaperPlane } from "react-icons/fa";
import axios from "../../components/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Chats = () => {
  const vendor = useSelector((state) => state.vendor);

  const [chats, setChats] = useState(
    vendor ? [{ receiver: vendor, createdAt: new Date() }] : []
  );
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(vendor);
  const [data, setData] = useState("");

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    try {
      const res = await axios.get("/chats");
      setChats([...chats, ...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async (recver) => {
    try {
      const res = await axios.get(`/messages/${recver._id}`);
      setMessages(res.data);
      setReceiver(recver);
    } catch (error) {
      console.log(error);
    }
  };

  // setTimeout(() => {
  //   if (receiver) getMessages(receiver);
  // }, 5000);

  const sendMessage = async () => {
    try {
      const toServer = {
        receiver: receiver?._id,
        message: data,
      };
      // Append message to chat
      setMessages([
        ...messages,
        {
          message: data,
          type: "outgoing",
          createdAt: new Date(),
        },
      ]);
      const res = await axios.post("/send-message", toServer);
      setData("");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="section-title">
        <h1>chats</h1>
      </div>
      <div className="chatbox">
        <div className="row g-0">
          <div className="col-lg-4">
            <div className="persons py-3 px-5">
              {chats.map((chat, key) => (
                <div
                  className={`mb-3 person ${
                    chat?.receiver === receiver ? "active" : ""
                  }`}
                  key={key}
                  onClick={() => getMessages(chat?.receiver)}
                >
                  <div className="d-flex">
                    <img
                      src={
                        chat?.receiver.photo
                          ? `${process.env.REACT_APP_BASE_URL}/${chat?.receiver.photo}`
                          : Empty
                      }
                      alt={chat?.receiver.name}
                      className="avatar"
                    />
                    <div className="info ms-2">
                      <h4>{chat?.receiver.name}</h4>
                      <p>{chat?.message}</p>
                    </div>
                  </div>
                  <div className="new">
                    <div className="last">
                      {new Date(chat?.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </div>
                    {chat?.count > 0 && (
                      <div className="count">{chat.count}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-8">
            {receiver && (
              <div className="head">
                <img
                  src={
                    receiver?.photo
                      ? `${process.env.REACT_APP_BASE_URL}/${receiver?.photo}`
                      : Empty
                  }
                  alt={receiver?.name}
                  className="avatar"
                />
                <h4 className="ms-2">{receiver?.name}</h4>
              </div>
            )}
            <div className="chats p-3">
              <div>
                {messages.map((message, key) => (
                  <div className={message?.type} key={key}>
                    {message?.message}
                    <div className="at">
                      {" "}
                      {new Date(message?.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="send">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    placeholder="Write here..."
                    className="form-control"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                  <button className="btn btn-main" onClick={sendMessage}>
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
