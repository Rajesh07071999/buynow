import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
        navigate("/");
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-4 py-2">
      <Link className="navbar-brand fw-bold text-dark" to="/">
        🛍️ BUYNOW
      </Link>
      <div className="ms-auto d-flex gap-2 align-items-center">
        {user ? (
          <>
            <Link className="navbar-brand fw-bold text-dark" to="/home">
              Home
            </Link>
            <div className="dropdown">
              <button
                className="btn border-0 p-0 bg-transparent dropdown-toggle"
                type="button"
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
            </div>
          </>
        ) : (
          <>
            <Link to="/register" className="btn btn-dark">
              Register Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
