import { FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as AllRedux from "../../store/slices/cartSlice";
import { orderPlace } from "../../store/slices/orderSlice";
import { useDispatch } from "react-redux";
import { userProfile } from "../../store/slices/userSlice"
import { cartListing, removeCartItem } from "../../store/slices/cartSlice";
import { BallTriangle } from "react-loader-spinner";

const Cart = () => {
    const [address, setAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                dispatch(userProfile({})).then((res) => {
                    if (res?.payload?.code == 200) {
                        setAddress(res.payload.data?.address);
                        setShippingAddress(res.payload.data?.shipping_address)
                    }
                });

            } catch (error) {
                console.log(error);
            } finally {
            }
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        const fetchCartListing = async () => {
            setLoading(true);
            try {
                const res = await dispatch(AllRedux.cartListing({}));

                if (res?.payload?.code == "200") {
                    const mappedItems = res.payload.data.map((item) => ({
                        ...item,
                        quantity: item.qty
                    }));
                    setCartItems(mappedItems);
                } else {
                    setCartItems([]);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                setCartItems([]);
            } finally {
                setTimeout(() => {
                    setLoading(false);

                }, 2000);
            }
        };

        fetchCartListing();
    }, []);


    const handleQuantityChange = (id, type) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity:
                            type === "inc"
                                ? item.quantity + 1
                                : item.quantity > 1
                                    ? item.quantity - 1
                                    : 1,
                    }
                    : item
            )
        );
    };


    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.productDetails?.[0].price * item.quantity,
        0
    );
    const shippingCost = subtotal > 5000 ? 100 : 0;
    const tax = subtotal * 0.18;
    const grandTotal = subtotal + shippingCost + tax;
    const handlePayment = () => {
        const orderItems = cartItems.map((item) => ({
            product_id: item.productDetails?.[0]._id,
            qty: item.quantity,
            total_price: item.productDetails?.[0].price * item.quantity,
            price: item.price,

        }))
        const payload = {
            address,
            shipping_address: shippingAddress,
            orderItems,
            grand_total: grandTotal,
        };
        dispatch(orderPlace({ payload })).then((res) => {
            console.log(res.payload)
            const orderId = res.payload.data.order_id;
            if (res.payload.code == 200) {
                dispatch(cartListing());
                setTimeout(() => navigate(`/order-confirmation/${orderId}`), 3000);
            }
        });

    };

    const removeCart = async (id) => {
        try {
            const res = await dispatch(removeCartItem({ id }));
            if (res?.payload?.code == 200) {
                setCartItems((prev) => prev.filter((item) => item._id !== id));
                dispatch(cartListing());
                toast.success("Item removed from cart!");
            } else {
                toast.error("Failed to remove item.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred.");
        }
    };

    return (
        <>
            <div className="container my-5">
                <div className="row g-4">
                    {/* LEFT: Cart Items */}



                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                            <BallTriangle
                                height={100}
                                width={100}
                                radius={5}
                                color="#4fa94d"
                                ariaLabel="ball-triangle-loading"
                                wrapperStyle={{}}
                                visible={true}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="col-lg-8">
                                <h3 className="mb-4 text-dark fw-bold">🛒 Your Cart</h3>


                                {cartItems?.length === 0 ? (
                                    <div className="alert alert-dark">Your cart is empty.</div>
                                ) : (
                                    <div className="list-group shadow-sm rounded">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item._id}
                                                className="list-group-item d-flex justify-content-between align-items-center flex-wrap bg-light mb-2 rounded"
                                            >
                                                <div className="d-flex flex-column">
                                                    <span className="fw-semibold">{item.productDetails?.[0].name}</span>
                                                    <span className="text-muted">₹{item.productDetails?.[0].price} each</span>
                                                    <div className="d-flex align-items-center mt-2">
                                                        <div className="d-flex align-items-center">
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => handleQuantityChange(item._id, "dec")}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="mx-2">{item.quantity}</span>
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => handleQuantityChange(item._id, "inc")}
                                                                disabled={item.quantity >= item.productDetails?.[0].stock_count}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <FaTrashAlt
                                                            size={14}
                                                            className="text-danger ms-2 d-flex align-items-center justify-content-center"
                                                            onClick={() => removeCart(item._id)}
                                                            title="Remove"
                                                            style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="fw-bold fs-5">
                                                    ₹{item.productDetails?.[0].price * item.quantity}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="p-3 bg-white rounded shadow-sm mt-3 text-end">
                                            <h5 className="fw-bold">Subtotal: ₹{subtotal.toFixed(2)}</h5>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-4">
                                <div className="card shadow-sm rounded mt-5" style={{ top: "10px" }}>
                                    <div className="card-body">
                                        <h5 className="mb-3 text-dark fw-bold">Delivery Details</h5>
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
                                            <span>₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>Shipping Cost</span>
                                            <span>₹{shippingCost.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>GST Total</span>
                                            <span>₹{tax.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                                            <span>Grand Total</span>
                                            <span>₹{grandTotal.toFixed(2)}</span>
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
                        </>

                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Cart;
