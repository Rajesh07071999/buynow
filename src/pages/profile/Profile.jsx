import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BallTriangle } from "react-loader-spinner";
import * as AllRedux from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        country_code: "",
        mobile_number: "",
    });
    const [editableUser, setEditableUser] = useState({ ...user });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const res = await dispatch(AllRedux.userProfile({}));
                if (res?.payload?.code == 200) {
                    const data = res.payload.data;
                    setUser(data);
                    setEditableUser(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
            }
        };
        fetchUserDetails();
    }, []);



    const handleChange = (e) => {
        setEditableUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            dispatch(AllRedux.editProfile({ editableUser })).then((res) => {
                if (res?.payload?.code == 200) {
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/home");
                    }, 3000);
                }
            });

        } catch (error) {
            setLoading(false);
            console.log("Update error:", error);
        }
    };


    return loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                visible={true}
            />
        </div>
    ) : (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 shadow p-4 bg-white rounded-4">
                    <h2 className="mb-4 text-dark fw-bold text-center">Edit Profile</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="full_name"
                                name="full_name"
                                value={editableUser.full_name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />
                            <label htmlFor="full_name">Full Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={editableUser.email}
                                readOnly
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="country_code"
                                name="country_code"
                                value={editableUser.country_code}
                                onChange={handleChange}
                                placeholder="Country Code"
                                required
                            />
                            <label htmlFor="country_code">Country Code</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="tel"
                                className="form-control"
                                id="mobile_number"
                                name="mobile_number"
                                value={editableUser.mobile_number}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                required
                            />
                            <label htmlFor="mobile_number">Mobile Number</label>
                        </div>

                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                onClick={() => navigate("/home")}
                                className="btn btn-secondary"
                            >
                                Back
                            </button>
                            <button type="submit" className="btn btn-dark">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
