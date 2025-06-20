const CarouselSection = () => {
  return (
    <div className="container-fluid px-0 ">
      <div
        id="ecomCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1688561807440-8a57dfa77ee3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
              className="d-block w-100 carousel-img"
              style={{ maxHeight: "90vh", objectFit: "cover" }}
              alt="Shopping"
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
              <h3 className="fw-bold">Welcome to <span className="text-warning">BUYNOW</span></h3>
              <p>Find your best deals now!</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5HX85I2zLsXYSSruC8670C/93ccb22b55d7638fc4109b118a7fd630/GettyImages-1313131428.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000"
              className="d-block w-100 carousel-img"
              style={{ maxHeight: "90vh", objectFit: "cover" }}
              alt="Fashion"
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
              <h3 className="fw-bold">Stylish Trends</h3>
              <p>Up to 60% off this season</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://media.licdn.com/dms/image/v2/C5112AQFtytomrik5zQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1549279886731?e=2147483647&v=beta&t=sWOx0Wae1JS3fsmwKd7VxXcDaB8ybpEso9hOmybu65g"
              className="d-block w-100 carousel-img"
              style={{ maxHeight: "90vh", objectFit: "cover" }}
              alt="Gadgets"
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
              <h3 className="fw-bold">Smart Gadgets</h3>
              <p>Upgrade your lifestyle</p>
            </div>
          </div>
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
      <section className="py-5 bg-light text-center">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4 card">
              <div className="p-4 shadow-sm bg-white rounded-3 h-100">
                <h5 className="fw-bold text-dark">🚚 Fast Delivery</h5>
                <p className="text-muted">We ensure your orders are delivered quickly and safely across the country.</p>
              </div>
            </div>
            <div className="col-md-4 card">
              <div className="p-4 shadow-sm bg-white rounded-3 h-100">
                <h5 className="fw-bold text-dark">🔒 Secure Payments</h5>
                <p className="text-muted">Your transactions are safe with our top-tier encryption & gateways.</p>
              </div>
            </div>
            <div className="col-md-4 card">
              <div className="p-4 shadow-sm bg-white rounded-3 h-100">
                <h5 className="fw-bold text-dark">📞 24/7 Support</h5>
                <p className="text-muted">Need help? Our support team is always here to assist you instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarouselSection;
