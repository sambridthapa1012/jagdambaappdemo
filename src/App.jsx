import { Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import BulkOrder from "./components/BulkOrder";
import Footer from "./components/Footer";
// @ts-expect-error no type defs for jsx files
import Login from "./components/Loginp";
// @ts-expect-error no type defs for jsx files
import Signup from "./components/Signup";

import { useState } from "react";
import Bestselling from "./components/BestSelling"; 

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => setIsCartOpen(true)} />

        <main>
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Bestselling />
                  <FeaturedCategories />
                  <FeaturedProducts />
                </>
              }
            />

            {/* PRODUCTS */}
            <Route path="/products" element={<ProductList />} />

            {/* PRODUCT DETAIL */}
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* CHECKOUT */}
            <Route path="/checkout" element={<Checkout />} />

            {/* BULK ORDER */}
            <Route path="/bulk" element={<BulkOrder />} />
          </Routes>
        </main>

        <Footer />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            navigate("/checkout");
            setIsCartOpen(false);
          }}
        />
      </div>
    </CartProvider>
  );
}

export default App;
