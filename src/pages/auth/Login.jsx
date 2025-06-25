import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { useState } from "react";
import { BallTriangle } from 'react-loader-spinner'
import * as AllRedux from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";


const Login = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      dispatch(AllRedux.login({ data })).then((res) => {
        if (res?.payload?.code == 200) {
          localStorage.setItem("token", res.payload.data.token);
          setUser(res.payload.data);
          navigate("/home");
          setLoading(false)
        }
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };


  return (
    <AuthLayout>

      <>
        <h2 className="fw-bold text-center mb-4 text-dark">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Login to your  account</p>
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
    </AuthLayout>
  );
};

export default Login;
