import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4 py-2 sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark fs-4" to="/">
          🛍️ <span className="text-dark">BuyNow</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {user ? (
            <ul className="navbar-nav align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="btn border-0 bg-transparent dropdown-toggle p-0"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={28} className="text-dark" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-dark btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-dark btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
