import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { useState } from "react";
import { Audio, BallTriangle } from 'react-loader-spinner'
const Login = ({ setUser }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);

    if (data.email === "krina@gmail.com" && data.password === "krina123") {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/home");
      }, 5000);
    } else {
      toast.error("Invalid credentials!");
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <h2 className="fw-bold text-center mb-4 text-dark">Welcome Back</h2>
          <p className="text-center text-muted mb-4">Login to your BUYNOW account</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control rounded-3 ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              <label htmlFor="email">Email Address</label>
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control rounded-3 ${errors.password ? "is-invalid" : ""}`}
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <label htmlFor="password">Password</label>
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn btn-dark w-100 py-2 rounded-3 shadow-sm">
              Login
            </button>
            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none text-dark fw-semibold">
                Register Now
              </Link>
            </p>
          </form>
        </>
      )}
    </AuthLayout>
  );
};

export default Login;
