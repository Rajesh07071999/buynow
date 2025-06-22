import { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaSortAmountDown, FaSortAmountUp, FaStar } from "react-icons/fa";
import "./home.css";
import { BallTriangle } from "react-loader-spinner";
import * as AllRedux from "../../store/slices/userSlice";
import { productListing, addProductRating } from "../../store/slices/productSlice";
import { addToCart, cartListing } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});

  const [userRating, setUserRating] = useState({});

  const updateProductQuantity = (productId, qty) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        dispatch(AllRedux.userProfile({})).then((res) => {
          if (res?.payload?.code == 200) {
            setUser(res.payload.data.full_name);
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchProductListing = async () => {
      setLoading(true);
      try {
        dispatch(productListing({ search: searchTerm, category: selectedCategory, rating: selectedRating, price: selectedPrice, sortOrder: sortOrder })).then((res) => {
          if (res?.payload?.code == 200) {
            setProducts(res.payload.data);
          }
          else if (res.payload.code == 404) {
            setProducts([])
          }
        });
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProductListing();
  }, [searchTerm, selectedCategory, selectedRating, selectedPrice, sortOrder]);

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleRating = async (productId, star) => {
    setUserRating((prev) => ({ ...prev, [productId]: star }));

    try {
      const res = await dispatch(addProductRating({ product_id: productId, rating: star }));

      if (res?.payload?.code == 200) {
        const updatedList = await dispatch(productListing());
        if (updatedList?.payload?.code == 200) {
          setProducts(updatedList.payload.data);
        }
      }
    } catch (error) {
      console.error("Rating error:", error);
    }
  };


  const AddToCart = async (product, quantity) => {
    try {
      dispatch(addToCart({ product_id: product._id, qty: quantity, price: product.price })).then((res) => {
        if (res?.payload?.code == 200) {
          dispatch(cartListing());
          // toast.success(" Added To Cart Successfully")
        }
      });
    } catch (error) {
      console.log(error);
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

    <div className="container-fluid my-5">
      <div className="bg-warning py-2 overflow-hidden position-relative">
        <div
          className="d-inline-block"
          style={{ whiteSpace: "nowrap", animation: "marquee 12s linear infinite" }}
        >
          🔥 50% OFF on Electronics! | 🎧 Get wireless headphones at ₹1499 | ⚡ Flash sale ends tonight | 🚚 Free delivery on orders above ₹5000
        </div>
      </div>

      <style>
        {`
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`}
      </style>
      <div className="p-4 mb-4 text-center bg-light text-dark rounded">
        <h1 className="fw-bold">Welcome, {user || "Shopper"} 👋</h1>
        <p className="lead">Find the best deals on your favorite products!</p>
      </div>

      <div className="bg-light text-dark py-2 overflow-hidden position-relative mb-4">
        <div
          className="d-inline-block"
          style={{ whiteSpace: "nowrap", animation: "marquee 15s linear infinite" }}
        >
          💥 Mega Sale on Electronics! Up to 50% off | 🚀 Free shipping on orders above ₹5000 | 🎧 Wireless Headphones at ₹2499 only! | ⌚ Smart Watches starting ₹3999 | 😎 Stylish Sunglasses at ₹699 — Grab Now!
        </div>
      </div>

      <div className="mb-4 col-md-8 mx-auto">
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products, brands, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-dark"><FaSearch /></button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-md-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Books">Books</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Automotive">Automotive</option>
            <option value="Grocery">Grocery</option>
            <option value="Pet Supplies">Pet Supplies</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <select
            className="form-select"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4">4 ⭐ & above</option>
            <option value="3">3 ⭐ & above</option>
            <option value="2">2 ⭐ & above</option>

          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <select
            className="form-select"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="1000">Below ₹1000</option>
            <option value="2000">Below ₹2000</option>
            <option value="4000">Below ₹4000</option>
            <option value="9000">Below ₹9000</option>
            <option value="10000">Below ₹10000</option>
          </select>
        </div>

        <div className="col-sm-6 col-md-3">
          <button className="btn btn-outline-dark w-100" onClick={handleSortToggle}>
            {sortOrder === "asc" ? <><FaSortAmountDown /> Price: Low to High</> : <><FaSortAmountUp /> Price: High to Low</>}
          </button>
        </div>
      </div>


      <div className="row g-4 mt-3">
        
        {products.length === 0 ? (
          <div className="alert alert-dark text-center w-100">No products available at the moment.</div>
        ) : (
          products.map((product) => {
            const quantity = quantities[product._id] || 1;
            const maxQty = product.stock_count || 10;

            return (
              
              <div className="col-sm-6 col-md-4 col-lg-3 d-flex" key={product._id}>
                
                <div className="product-card d-flex flex-column w-100 border rounded shadow-sm overflow-hidden bg-white card">
                  <div className="image-container" style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      src={product.image || "https://m.media-amazon.com/images/I/71plM9ESarL.jpg"}
                      alt={product.name}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-1 text-dark text-truncate">{product.name}</h5>
                      <p className="small text-muted mb-2 fw-bold" style={{ minHeight: "48px" }}>
                        {product.description.length > 70
                          ? product.description.substring(0, 70) + "..."
                          : product.description}
                      </p>

                      <div className="text-warning mb-2">
                        {"⭐".repeat(Math.floor(product.averageRating || 0))}{" "}
                        <span className="text-muted small ms-1">({product.averageRating || 0})</span>
                      </div>

                      <div className="text-success fw-semibold mb-2">₹{product.price}</div>
                    </div>

                    <div className="mb-2">
                      <label className="small text-secondary d-block">Your Rating:</label>
                      <div className="d-flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={18}
                            className="star-input"
                            color={userRating[product._id] >= star ? "#ffc107" : "#e4e5e9"}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRating(product._id, star)}
                            title={`${star} star${star > 1 ? "s" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-3 pb-3 d-flex justify-content-between align-items-center">
                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          updateProductQuantity(product._id, Math.max(1, quantity - 1))
                        }
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          updateProductQuantity(product._id, Math.min(maxQty, quantity + 1))
                        }
                        disabled={quantity >= maxQty}
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "45px", height: "45px" }}
                      onClick={() => AddToCart(product, quantity)}
                      title="Add to Cart"
                    >
                      <FaShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })


        )}
      </div>
    </div>
  );
};

export default Home;
