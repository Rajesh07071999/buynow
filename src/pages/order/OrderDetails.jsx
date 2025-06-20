import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen, FaRupeeSign } from "react-icons/fa";

const dummyOrders = [
  {
    id: "ORD123456",
    date: "2025-06-19",
    total: 2599,
    items: [
      { name: "Wireless Headphones", qty: 1, price: 1999 },
      { name: "Sunglasses", qty: 1, price: 600 },
    ],
    status: "Delivered",
  },
  {
    id: "ORD789101",
    date: "2025-06-25",
    total: 4999,
    items: [{ name: "Smart Watch", qty: 1, price: 4999 }],
    status: "Shipped",
  }
];

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = dummyOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Order not found!</div>
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Orders
      </button>

      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex flex-wrap justify-content-between">
          <div>
            <h4 className="fw-bold text-dark mb-2">Order ID: {order.id}</h4>
            <div className="text-muted">Date: {order.date}</div>
          </div>
          <div>
            <span className={`badge fs-6 ${order.status === "Delivered"
              ? "bg-success"
              : order.status === "Shipped"
              ? "bg-primary"
              : "bg-danger"
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-4">
        <h5 className="fw-bold text-dark mb-3">📦 Items</h5>
        <ul className="list-group mb-3">
          {order.items.map((item, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.name}</strong> <br />
                <span className="text-muted small">Quantity: {item.qty}</span>
              </div>
              <div>
                ₹{item.price * item.qty}
              </div>
            </li>
          ))}
        </ul>

        <div className="d-flex justify-content-end gap-3 fw-bold fs-5">
          <div>Total:</div>
          <div><FaRupeeSign /> {order.total}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
