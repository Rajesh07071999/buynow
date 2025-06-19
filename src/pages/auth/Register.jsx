import { useForm } from "react-hook-form";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <AuthLayout>
      <h2 className="fw-bold text-center mb-4 text-dark">Create Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-floating mb-3">
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
          />
          <label htmlFor="name">Full Name</label>
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
          <label htmlFor="email">Email</label>
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
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

        {/* Confirm Password */}
        <div className="form-floating mb-3">
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-dark w-100">Register</button>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login"  className="text-decoration-none text-dark fw-semibold">Login Now</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
