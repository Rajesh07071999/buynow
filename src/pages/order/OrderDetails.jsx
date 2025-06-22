import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRupeeSign } from "react-icons/fa";
import { BallTriangle } from "react-loader-spinner";
import { orderListing } from "../../store/slices/orderSlice";
import { useDispatch } from "react-redux";
const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        dispatch(orderListing({ id: orderId })).then((res) => {
          console.log(res.payload);
          
          if (res?.payload?.code == 200) {
            setOrder(res.payload.data.orders[0]);
          }
          else {
            setOrder([])
          }
        });
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchOrder();
  }, [orderId]);
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <BallTriangle height={100} width={100} color="#4fa94d" />
      </div>
    );
  }
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
  const grandTotal = order.productDetails.reduce(
    (sum, product) => sum + product.price * order.qty,
    0
  );
  return (
    <div className="container my-5">
      <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Orders
      </button>
      <div className="card shadow-sm p-4 mb-4">
        <div className="d-flex flex-wrap justify-content-between">
          <div>
            <h4 className="fw-bold text-dark mb-2">Order ID: {order.order_id}</h4>
            <div className="text-muted">
              Delivery Date: {new Date(order.orderDetails.delivery_date).toLocaleDateString()}
            </div>
          </div>
          <div>
            <span
              className={`badge fs-6 ${order.status === "Delivered"
                ? "bg-success"
                : order.status === "Shipped"
                  ? "bg-primary"
                  : "bg-danger"
                }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>
      <div className="card shadow-sm p-4">
        <h5 className="fw-bold text-dark mb-3">📦 Items</h5>
        <ul className="list-group mb-3">
          {order.productDetails.map((product, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{product.name}</strong>
                <br />
                <span className="text-muted small">Quantity: {order.qty}</span>
              </div>
              <div>₹{product.price * order.qty}</div>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-end gap-3 fw-bold fs-5">
          <div>Total:</div>
          <div>
            <FaRupeeSign /> {grandTotal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
