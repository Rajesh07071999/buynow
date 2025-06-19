import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/Header/Header";
import CarouselSection from "./components/Carousel/CarouselSection";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import PrivateRoute from "./secure/PrivateRouter";
import GuestRoute from "./secure/GuestRouter";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CarouselSection />} />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
