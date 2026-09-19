import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import AboutPage from "./pages/AboutPage";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";

import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { BannerProvider } from "./context/BannerContext";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <ToastProvider>
      <BannerProvider>
        <ProductProvider>
          <OrderProvider>
            <CartProvider>
              <div className="min-h-screen w-full bg-white text-black dark:bg-black dark:text-white overflow-x-hidden">
                <Navbar theme={theme} setTheme={setTheme} />
                <main className="w-full pt-28">
                  <Routes>
                    <Route path="/" element={<Home theme={theme} />} />
                    <Route path="/cars" element={<Cars theme={theme} />} />
                    <Route path="/about" element={<AboutPage theme={theme} />} />
                    <Route path="/booking" element={<Booking theme={theme} />} />
                    {/* 🔒 SECRET ADMIN URL */}
                    <Route path="/admin-panel-secret" element={<Admin theme={theme} />} />
                    <Route path="/checkout" element={<Checkout theme={theme} />} />
                  </Routes>
                </main>
                <Footer theme={theme} />
              </div>
            </CartProvider>
          </OrderProvider>
        </ProductProvider>
      </BannerProvider>
    </ToastProvider>
  );
};

export default App;