import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Truck, Shield, Headphones, Award } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => navigate("/products");

  return (
    <section className="relative">
      {/* Main Hero Banner */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600")',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Build Your Dreams
              <span className="block text-orange-400 text-2xl md:text-3xl mt-2">
                सपनाको घर बनाउनुहोस्
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Quality construction materials and tools for every project. From
              cement to finishing touches, we have everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleViewProducts}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition duration-300 flex items-center justify-center font-semibold"
              >
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition duration-300 font-semibold">
                Request Bulk Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Offer Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            🎉 Festival Season Mega Sale! Up to 25% OFF on all construction
            materials
            <span className="ml-4 text-yellow-200">Use code: TIHAR2024</span>
          </p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Free Delivery</h3>
              <p className="text-sm text-gray-600 mt-1">
                Kathmandu Valley
                <br />
                <span className="text-xs">Order above Rs. 5,000</span>
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Quality Guarantee</h3>
              <p className="text-sm text-gray-600 mt-1">
                100% Authentic Products
                <br />
                <span className="text-xs">Verified suppliers only</span>
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Expert Support</h3>
              <p className="text-sm text-gray-600 mt-1">
                10AM - 8PM Daily
                <br />
                <span className="text-xs">Technical guidance available</span>
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">15+ Years</h3>
              <p className="text-sm text-gray-600 mt-1">
                Serving Nepal
                <br />
                <span className="text-xs">Trusted by 10,000+ customers</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

