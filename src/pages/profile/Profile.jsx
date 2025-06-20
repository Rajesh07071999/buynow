import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [editableUser, setEditableUser] = useState({ ...user });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setEditableUser(storedUser);
        }
    }, []);

    const handleChange = (e) => {
        setEditableUser({
            ...editableUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(editableUser));
        setUser(editableUser);
        toast.success("Profile updated successfully!", {
            position: "top-right",
            autoClose: 3000,
        })
    };

    const handleCancel = () => {
        setEditableUser(user);
        navigate("/home")
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 shadow p-4 bg-white rounded-4">
                    <h2 className="mb-4 text-dark fw-bold text-center">Edit Profile</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={editableUser.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={editableUser.email}
                                onChange={handleChange}
                                placeholder="Email"
                                readOnly
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={editableUser.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                            />
                            <label htmlFor="phone">Phone Number</label>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="button" onClick={handleCancel} className="btn btn-secondary">
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
