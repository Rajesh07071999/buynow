import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ user }) => {
    if (!user) return null;
    return (
        <footer className="bg-dark text-white mt-5 pt-4 pb-2">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-md-4">
                        <h5 className="fw-bold">🛍️ BUYIT</h5>
                        <p className="small">
                            Your one-stop shop for amazing deals on electronics, fashion, and more. Thank you for shopping with us!
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-bold">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li><Link to="/home" className="text-white-50 text-decoration-none">Home</Link></li>
                            <li><Link to="/profile" className="text-white-50 text-decoration-none">Profile</Link></li>
                            <li><Link to="/cart" className="text-white-50 text-decoration-none">Cart</Link></li>
                            <li><Link to="/order-history" className="text-white-50 text-decoration-none">Order History</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-bold">Follow Us</h6>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white-50 fs-5"><FaFacebook /></a>
                            <a href="#" className="text-white-50 fs-5"><FaTwitter /></a>
                            <a href="https://www.instagram.com/imrajesh07/" className="text-white-50 fs-5"><FaInstagram /></a>
                            <a href="#" className="text-white-50 fs-5"><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <hr className="border-secondary mt-4" />
                <div className="text-center small text-white-50">
                    &copy; {new Date().getFullYear()} 🛍️ BUYIT. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
