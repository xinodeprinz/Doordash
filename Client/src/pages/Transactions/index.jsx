import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./styles.css";
import axios from "../../components/axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const res = await axios.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="section-title">
        <h1>transactions</h1>
      </div>
      {transactions.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>type</th>
                <th>amount</th>
                <th>method</th>
                <th>vendor</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans, key) => (
                <tr key={key}>
                  <td>{++key}</td>
                  <td>{trans.type}</td>
                  <td>{trans.amount}</td>
                  <td>{trans.method}</td>
                  <td>
                    {["deposit", "withdrawal"].includes(trans.type)
                      ? "-"
                      : trans.userId.name}
                  </td>
                  <td>
                    {new Date(trans.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">
          You have not done any transactions yet.
        </div>
      )}
    </Layout>
  );
};

export default Transactions;
