import { useForm } from "react-hook-form";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/slices/userSlice"; 

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = {
      full_name: data.name,
      email: data.email,
      password: data.password,
      mobile_number: data.mobile_number,
      country_code: data.country_code,
    };

    try {
      const res = await dispatch(registerUser(newData));
      console.log(res)
      if (res?.payload?.code == "200" ) {
        navigate("/login");
      } else {
        toast.error(res?.payload?.message || "Registration failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
    }
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
        <div className="mb-3 d-flex gap-2">
          <div className="form-floating" style={{ flex: "0 0 120px" }}>
            <select
              className={`form-select ${errors.country_code ? "is-invalid" : ""}`}
              id="country_code"
              {...register("country_code", {
                required: "Country code is required"
              })}
            >
              <option value="">Code</option>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+971">+971</option>
              <option value="+61">+61</option>
            </select>
            <label htmlFor="country_code">Country Code</label>
            {errors.country_code && <div className="invalid-feedback">{errors.country_code.message}</div>}
          </div>

          <div className="form-floating flex-grow-1">
            <input
              type="text"
              className={`form-control ${errors.mobile_number ? "is-invalid" : ""}`}
              id="mobile_number"
              placeholder="Mobile Number"
              {...register("mobile_number", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: "Invalid mobile number"
                }
              })}
            />
            <label htmlFor="mobile_number">Mobile Number</label>
            {errors.mobile_number && <div className="invalid-feedback">{errors.mobile_number.message}</div>}
          </div>
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
          Already have an account? <Link to="/login" className="text-decoration-none text-dark fw-semibold">Login Now</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
