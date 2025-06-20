import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/Header/Header";
import CarouselSection from "./components/Carousel/CarouselSection";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import PrivateRoute from "./secure/PrivateRouter";
import GuestRoute from "./secure/GuestRouter";
import { CartProvider, useCart } from "./context/CartContext";

import { FaDatabase, FaHistory, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { ToastContainer } from "react-toastify";
import OrderDetails from "./pages/order/OrderDetails";
import OrderConfirmation from "./pages/order/OrderConfirmation";

const CartIcon = ({ user }) => {
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!user) return null;

  return (
    <div
      className="position-fixed"
      style={{
        top: "100px",
        right: "20px",
        zIndex: 1050, // Ensure it stays above carousel / content
      }}
    >
      <Link
        to="/cart"
        className="btn btn-dark position-relative shadow-sm rounded-circle p-2"
        title="Cart"
        style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <FaShoppingCart size={20} />
        {totalQty > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate__animated animate__bounceIn"
            style={{ fontSize: "0.75rem" }}
          >
            {totalQty}
          </span>
        )}
      </Link>
    </div>
  );
};


const DashBoardIcon = ({ user }) => {
  if (!user) return null;
  return (
    <div
      className="position-fixed"
      style={{
        top: "160px",  
        right: "20px",
        zIndex: 1050,
      }}
    >
      <Link
        to="/dashboard"
        className="btn btn-dark position-relative shadow-sm rounded-circle p-2"
        title="Dashboard"
        style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <FaDatabase size={20} />
      </Link>
    </div>
  );
};
function App() {

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <CartProvider>
      <Router>
        <Header user={user} setUser={setUser} />
        <CartIcon user={user} />
        <DashBoardIcon user={user} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<CarouselSection />} />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login setUser={setUser} />
                </GuestRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/order/:orderId"
              element={
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <PrivateRoute>
                  <OrderConfirmation />
                </PrivateRoute>
              }
            />
          </Routes>
          
        </div>
        <Footer user={user} />
      </Router>
      <ToastContainer/>
    </CartProvider>
  );
}

export default App;
