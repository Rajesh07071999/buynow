import React from "react";
import "./CarouselSection.css"; 
import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";

const slides = [
  {
    img: "https://infygain.com/uploads/3e8528b7-fb50-421e-be4f-50da50e24483E-commerce%20Website%20Development%20Company%20in%20Coimbatore%20(1).webp", // ✅ Serve WebP or optimized format
    title: "Welcome to",
    highlight: "🛍️ BUYNOW",
    subtitle: "Find your best deals now!"
  },
  {
    img: "https://www.areinfotech.com/assets/images/b2b-ecommerce-website-development.webp",
    title: "Stylish Trends 🛍️ BuyNow",
    subtitle: "Up to 60% off this season"
  },
  {
    img: "https://www.codiasticsoft.com/assets/img/blogs/E-Comm.jpg",
    title: "Smart Gadgets 🛍️ BuyNow",
    subtitle: "Upgrade your lifestyle"
  }
];

const CarouselSection = () => {
  return (
    <div className="container-fluid px-0">
      <div
        id="ecomCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3500"
      >
        <div className="carousel-inner">
          {slides.map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="position-relative">
                <img
                  src={item.img}
                  className="carousel-img d-block w-100"
                  alt={item.title}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="carousel-caption d-none d-md-block position-absolute top-50 start-50 translate-middle text-white bg-dark bg-opacity-50 rounded p-4 shadow-lg">
                  <h2 className="fw-bold">
                    {item.title}{" "}
                    {item.highlight && <span className="text-warning">{item.highlight}</span>}
                  </h2>
                  <p className="lead">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#ecomCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#ecomCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>

      {/* Info section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-white shadow rounded h-100">
                <FaShippingFast className="display-5 text-warning mb-3" />
                <h5 className="fw-bold">Fast Delivery</h5>
                <p className="text-muted">
                  We ensure quick and safe delivery of your orders across the country.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white shadow rounded h-100">
                <FaShieldAlt className="display-5 text-primary mb-3" />
                <h5 className="fw-bold">Secure Payments</h5>
                <p className="text-muted">
                  Payments are protected with industry-leading security measures.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white shadow rounded h-100">
                <FaHeadset className="display-5 text-success mb-3" />
                <h5 className="fw-bold">24/7 Support</h5>
                <p className="text-muted">
                  Need help? Our friendly team is always available for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarouselSection;
