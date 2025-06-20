import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const [address, setAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = subtotal > 5000 ? 100 : 0;
    const tax = subtotal * 0.18;
    const grandTotal = subtotal + shippingCost + tax;

    const handleQuantityChange = (id, value) => {
        const qty = parseInt(value);
        if (qty <= 0) {
            removeFromCart(id);
        } else {
            updateQuantity(id, qty);
        }
    };

    const handlePayment = () => {
        toast.success("Payment successful!!", {
            position: "top-right",
            autoClose: 3000,
        });
        clearCart();
        setTimeout(() => navigate("/order-confirmation"), 3000);
    };

    return (
        <>
            <div className="container my-5">
                <div className="row g-4">
                    {/* LEFT: Cart Items */}
                    <div className="col-lg-8">
                        <h3 className="mb-4 text-dark fw-bold">🛒 Your Cart</h3>
                        {cartItems.length === 0 ? (
                            <div className="alert alert-info">Your cart is empty.</div>
                        ) : (
                            <div className="list-group shadow-sm rounded">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="list-group-item d-flex justify-content-between align-items-center flex-wrap bg-light mb-2 rounded"
                                    >
                                        <div className="d-flex flex-column">
                                            <span className="fw-semibold">{item.name}</span>
                                            <span className="text-muted">₹{item.price} each</span>
                                            <div className="d-flex align-items-center mt-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                    className="form-control"
                                                    style={{ width: "80px" }}
                                                />

                                                <FaTrashAlt size={14} className="text-danger ms-2 d-flex align-items-center justify-content-center"
                                                    onClick={() => removeFromCart(item.id)}
                                                    title="Remove"
                                                    style={{ width: "22px", height: "22px" }} />

                                            </div>
                                        </div>
                                        <div className="fw-bold fs-5">₹{item.price * item.quantity}</div>
                                    </div>
                                ))}
                                <div className="p-3 bg-white rounded shadow-sm mt-3 text-end">
                                    <h5 className="fw-bold">Subtotal: ₹{subtotal}</h5>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Address + Payment */}
                    <div className="col-lg-4 ">
                        <div className="card shadow-sm rounded mt-5" style={{ top: "10px" }}>
                            <div className="card-body">
                                <h5 className="mb-3 text-dark fw-bold ">Delivery Details</h5>
                                <textarea
                                    className="form-control mb-3"
                                    rows="2"
                                    placeholder="Billing Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <textarea
                                    className="form-control mb-3"
                                    rows="2"
                                    placeholder="Shipping Address"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                />
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Sub Total</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Shipping Cost</span>
                                    <span>₹{shippingCost}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span>GST Total</span>
                                    <span>₹{tax}</span>
                                </div>
                                <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                                    <span>Grand Total</span>
                                    <span>₹{grandTotal}</span>
                                </div>
                                <button
                                    className="btn btn-success w-100"
                                    disabled={!address || !shippingAddress || cartItems.length === 0}
                                    onClick={handlePayment}
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Cart;
