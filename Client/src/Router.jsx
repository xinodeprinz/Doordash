import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chats from "./pages/Chats";
import Errands from "./pages/Errands";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import { useSelector } from "react-redux";

const Router = () => {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const isAuth = user || token ? true : false;

  const Protected = ({ comp }) => {
    return isAuth ? comp : <Navigate to={"/login"} />;
  };

  const Unprotected = ({ comp }) => {
    return !isAuth ? comp : <Navigate to={"/home"} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/login" element={<Unprotected comp={<Login />} />} />
        <Route path="/register" element={<Unprotected comp={<Register />} />} />
        <Route path="/home" element={<Protected comp={<Home />} />} />
        <Route path="/errands" element={<Protected comp={<Errands />} />} />
        <Route path="/users" element={<Protected comp={<Users />} />} />
        <Route path="/chats" element={<Protected comp={<Chats />} />} />
        <Route
          path="/transactions"
          element={<Protected comp={<Transactions />} />}
        />
        <Route path="/payment" element={<Protected comp={<Payment />} />} />
        <Route path="/profile" element={<Protected comp={<Profile />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
