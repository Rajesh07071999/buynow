
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthLayout.css"; // We'll create this CSS below

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-wrapper container-fluid min-vh-100 d-flex flex-column flex-md-row p-0">
      <div className="auth-left d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5">
        <h1 className="display-5 fw-bold mb-3">Welcome to <span className="text-warning">BUYIT</span></h1>
        <p className="lead">Shop smart, live better 🚀</p>
      </div>
      <div className="auth-right d-flex align-items-center justify-content-center w-100 p-4 bg-light">
        <div className="w-100" style={{ maxWidth: "450px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
