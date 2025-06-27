import React from "react";
import "./CarouselSection.css";
import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";

const slides = [
  {
    img: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/Image-1.jpg",
    title: "Welcome to",
    highlight: "🛍️ BUYIT",
    subtitle: "Find your best deals now!"
  },
  {
    img: "https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169847.jpg",
    title: "Stylish Trends 🛍️ BuyIt",
    subtitle: "Up to 60% off this season"
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1683147686464-63ad6c430711?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
    title: "Smart Gadgets 🛍️ BuyIt",
    subtitle: "Upgrade your lifestyle"
  }
];

const CarouselSection = () => {
  return (
    <div className="container-fluid px-0">
      <div
        id="ecomCarousel"
        className="carousel slide carousel-fade position-relative"
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
                <div className="carousel-caption text-white rounded p-4">
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

      {/* Info Section */}
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
