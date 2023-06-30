import Layout from "../../components/Layout";
import "./styles.css";
import Empty from "../../images/empty.jpg";
import { FaPaperPlane } from "react-icons/fa";

const Chats = () => {
  return (
    <Layout>
      <div className="section-title">
        <h1>chats</h1>
      </div>
      <div className="chatbox">
        <div className="row g-0">
          <div className="col-lg-4">
            <div className="persons py-3 px-5">
              {[1, 2, 3, 4, 5].map((key) => (
                <div className="mb-3 person" key={key}>
                  <div className="d-flex">
                    <img src={Empty} alt="avatar" className="avatar" />
                    <div className="info ms-2">
                      <h4>kayla naomi</h4>
                      <p>How are you?</p>
                    </div>
                  </div>
                  <div className="new">
                    <div className="last">4:30 pm</div>
                    <div className="count">50</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-8">
            <div className="head">
              <img src={Empty} alt="avatar" className="avatar" />
              <h4 className="ms-2">kaylani naomi</h4>
            </div>
            <div className="chats p-3">
              <div className="incoming">
                Hello world? How are you today. I'm fine thank you. Will you
                attend work today?
                <div className="at">12:26 pm</div>
              </div>
              <div className="outgoing">
                Hello world? How are you today. I'm fine thank you. Will you
                attend work today?
                <div className="at">12:26 pm</div>
              </div>
              <div className="outgoing">
                Hello world? How are you today. I'm fine thank you. Will you
                attend work today?
                <div className="at">12:26 pm</div>
              </div>
              <div className="incoming">
                Hello world? How are you today. I'm fine thank you. Will you
                attend work today?
                <div className="at">12:26 pm</div>
              </div>
              <div className="send">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    placeholder="Write here..."
                    className="form-control"
                  />
                  <button className="btn btn-main">
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
