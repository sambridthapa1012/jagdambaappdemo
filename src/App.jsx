import { Routes, Route, useNavigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

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
import OTPPage from "./components/OTPPage";

import { useState } from "react";
import Bestselling from "./components/BestSelling"; 
import ProtectedRoute from "./routes/ProtectedRoutes";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatbotWidget from "./components/ChatbotWidget";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import BestDealsProduct from "./components/BestDealsProduct";
import MyOrdersPage from "./components/MyOrdersPage";
import MyProfilePage from "./components/MyProfilePage";

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
                  <BestDealsProduct />
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/otp-page" element={<OTPPage />} />
            <Route path="/password-reset-success" element={<PasswordResetSuccess />} />

            {/* CHECKOUT */}
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

            {/* BULK ORDER */}
            <Route path="/bulk" element={<ProtectedRoute><BulkOrder /></ProtectedRoute>} />
            {/* USER DASHBOARD */}
            <Route path="/my-orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
            <Route path="/my-profile" element={<ProtectedRoute><MyProfilePage /></ProtectedRoute>} />
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

        <ChatbotWidget />
        <WhatsAppButton />
      </div>
    </CartProvider>
    
  );
}

export default App;
