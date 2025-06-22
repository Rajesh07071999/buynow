import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import * as AllRedux from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
const dispatch = useDispatch()
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
           dispatch(AllRedux.logout({  })).then((res) => {
                  if (res?.payload?.code == 200) {
                  localStorage.removeItem("token");
            setUser(null);
            navigate("/");
            
                  }
                });
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Something went wrong!");
        } finally {
        }

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
                  <FaUserCircle size={35} className="text-dark" />
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
