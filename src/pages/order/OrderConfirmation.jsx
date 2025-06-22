import { Link, useParams, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { orderListing } from "../../store/slices/orderSlice";
const OrderConfirmation = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch()
    const passedOrder = location.state?.order;

    const [order, setOrder] = useState(passedOrder || null);
    const [loading, setLoading] = useState(!passedOrder);
    useEffect(() => {
        if (!order) {
            const fetchOrder = async () => {
                setLoading(true);
                try {
                    dispatch(orderListing({ id: orderId })).then((res) => {
                        if (res?.payload?.code == 200) {
                            setOrder(res.payload.data.orders[0]);
                        } else {
                            setOrder(null);
                        }
                    });
                } catch (error) {
                    console.error(error);
                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000);
                }
            };
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                <BallTriangle height={100} width={100} color="#4fa94d" />
            </div>
        );
    }
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
                        <li><strong>Order ID:</strong> {order?.order_id}</li>
                        <li><strong>Status:</strong> {order?.status}</li>
                        <li><strong>Payment:</strong> Paid</li>
                        <li><strong>Delivery Date:</strong>{new Date(order?.orderDetails?.delivery_date).toLocaleDateString()}
                        </li>
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
