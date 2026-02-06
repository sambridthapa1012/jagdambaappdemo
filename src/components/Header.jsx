import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  MapPin,
  User,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";
import logo_j from "../assets/jagadambap_logo.jpg";
import axios from "axios";
import { toast } from "sonner";
import { smartSearch } from "../utils/SearchProduct";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";






const Header = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [search,setSearch]=useState("");
  const [suggestions,setSuggestions]=useState([]);
  const [profileOpen, setProfileOpen] = useState(false);

  



  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
    const authPages = ["/login", "/signup", "/forgot-password", "/reset-password/:token","/otp-page","/password-reset-success","/my-orders","/my-profile"];
  const isAuthPage = authPages.includes(location.pathname);
   const { products, loading } = useProducts();
   const { clearLocalCart } = useCart();
  const handleSearch = (value) => {
  setSearch(value);
  if (location.pathname === "/login") {
  return null;
}

  if (!value) {
    setSuggestions([]);
    return;
  }

  const results = smartSearch(products, value).slice(0, 6);
  setSuggestions(results);
};




  const isActive = (path) =>
    location.pathname === path ? "text-orange-600" : "";
 const { user, isAuthenticated, logout } = useAuth();


 const handleLogout = async () => {
  await clearLocalCart(); 
  logout();
  toast.success("Logged out successfully");
  navigate("/login");
};


  return (
    
    <header className="bg-white shadow-md relative z-50">
      {!isAuthPage && (
        <>
      {/* Top Bar */}
      <div className="bg-orange-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>01-515825 | 9851079391</span>
            </div>
            <div className="hidden md:flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                Delivery all over Kathmandu Valley | काठमाडौं उपत्यकामा 
                डिलिभरी
              </span>
            </div>
          </div>
          {/* <p>Hello, {user?.firstName} {user?.lastName}</p> */}
<div className="relative">
  {isAuthenticated ? (
    <>
      {/* Profile Button */}
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-2 hover:text-orange-200"
      >
        <img
          src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.firstName}
          alt="profile"
          className="w-8 h-8 rounded-full border"
        />
        <span className="font-medium">Hi, {user?.firstName}</span>
      </button>

      {/* Dropdown */}
      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          <button
            onClick={() => {
              navigate("/my-orders");
              setProfileOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-orange-50"
          >
            My Orders
          </button>

          <button
            onClick={() => {
              navigate("/my-profile");
              setProfileOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-orange-50"
          >
            My Profile
          </button>

          <hr />

          <button
            onClick={async () => {
              await clearLocalCart();
              logout();
              toast.success("Signed out successfully");
              navigate("/");
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  ) : (
    
    <button
      className="hover:text-orange-200 flex items-center gap-1"
      onClick={() => navigate("/login")}
    >
      <User className="h-4 w-4" />
      Login
    </button>
  )}
</div>



     {/* {isAuthenticated ? (
  <button
    className="hover:text-orange-200 flex items-center gap-1"
    onClick={handleLogout}
  >
    <User className="h-4 w-4" />
    Logout
  </button>
) : (
  <button
    className="hover:text-orange-200 flex items-center gap-1"
    onClick={() => navigate("/login")}
  >
    <User className="h-4 w-4" />
    Login
  </button>
)} */}

        </div>
      </div>

      
         {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo_j}
              alt="Jagadamba Logo"
              className="w-25 h-20 object-contain"
            />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
             <input type="text" placeholder="Search cement, wire, roofing..."value={search}
  onChange={(e) => handleSearch(e.target.value)}
  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
/>

              <button className="absolute right-0 top-0 h-full px-6 bg-orange-600 text-white rounded-r-lg">
                Search
              </button>
              {suggestions.length > 0 && (
  <div className="absolute z-50 bg-white w-full mt-1 border rounded-lg shadow-lg">
    {suggestions.map((p) => (
      <div
        key={p._id}
        onClick={() => {
          navigate(`/products/${p._id}`);
          setSearch("");
          setSuggestions([]);
        }}
        className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer"
      >
        <img
          src={p.images?.[0]?.url || "https://via.placeholder.com/50"}
          alt={p.name}
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <p className="font-medium">{p.name}</p>
          <p className="text-sm text-gray-500">
            {p.brand} • NPR {p.price}
          </p>
        </div>
      </div>
    ))}
  </div>
)}

            </div>
          </div>

          {/* Cart + Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-orange-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Nav */}
      {/* <nav className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 hidden md:flex space-x-8 py-3">
          <button
            onClick={() => navigate("/")}
            className={`font-medium hover:text-orange-600 ${isActive("/")}`}
          >
            Home
          </button>

          {categories.slice(0, 6).map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => setActiveDropdown(category.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => navigate("/products")}
                className="font-medium hover:text-orange-600"
              >
                {category.name}
              </button>

              {activeDropdown === category.id && (
                <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => navigate("/products")}
                      className="block w-full text-left px-2 py-1 hover:text-orange-600"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => navigate("/bulk")}
            className="font-medium hover:text-orange-600"
          >
            Bulk Orders
          </button>
        </div>
      </nav> */}

      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-3 space-y-2">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/products")}>Products</button>
          <button onClick={() => navigate("/bulk")}>Bulk Orders</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
        </>
      )}
     
    </header>
  );
};

export default Header;

