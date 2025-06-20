import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const OrderConfirmation = () => {
    return (
        <div className="container my-5">
            <div className="text-center">
                <FaCheckCircle size={80} className="text-success mb-3" />
                <h2 className="fw-bold text-dark mb-2">Thank You for Your Order!</h2>
                <p className="text-muted mb-4">
                    Your payment was successful. We've received your order and will process it shortly.
                </p>
                <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
                    <h5 className="fw-bold text-dark mb-3">Order Summary</h5>
                    <ul className="list-unstyled small text-start mb-3">
                        <li><strong>Order ID:</strong> ORD{Math.floor(Math.random() * 1000000)}</li>
                        <li><strong>Status:</strong> Confirmed</li>
                        <li><strong>Payment:</strong> Paid</li>
                        <li><strong>Delivery:</strong> Expected in 3-5 business days</li>
                    </ul>
                    <Link to="/home" className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
