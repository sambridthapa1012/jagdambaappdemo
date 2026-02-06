import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Award,
  Truck,
  Shield,
  Phone,
} from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";



const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
   const { products, loading } = useProducts();
  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, []);

 
  const { id } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Loading product...</p>
    </div>
  );
}

  const product = products.find((p) => p._id === id);


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // const handleAddToCart = () => {
  //   for (let i = 0; i < quantity; i++) {
  //     dispatch({ type: "ADD_ITEM", payload: product });
  //   }
  // };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images?.[selectedImage]?.url || product.image?.url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            {product.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-orange-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image?.url}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                {product.nameNepali && (
                  <p className="text-lg text-gray-600 mb-2">
                    {product.nameNepali}
                  </p>
                )}
                <p className="text-gray-600">{product.brand}</p>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 border border-gray-200 rounded-lg">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 border border-gray-200 rounded-lg">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-3xl font-bold text-gray-800">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through ml-3">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium ml-2">
                      Save{" "}
                      {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {product.isMadeInNepal && (
                <div className="flex items-center text-blue-600 mb-2">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Made in Nepal</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-lg hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 px-3 py-2 border-t border-b border-gray-200 text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {product.stockQuantity} items available
              </p>
            </div>

            {/* Add to Cart */}
            <div className="mb-6">
              <button
                onClick={() => addItem(product._id)}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition duration-300 flex items-center justify-center font-semibold text-lg mb-4"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - {formatPrice(product.price * quantity)}
              </button>

              <button onClick={()=>{addItem(product._id)
                navigate('/checkout')
              }} className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition duration-300 font-semibold">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Free Delivery</p>
                <p className="text-xs text-gray-500">Above Rs. 5,000</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Quality Guaranteed</p>
                <p className="text-xs text-gray-500">100% Authentic</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Expert Support</p>
                <p className="text-xs text-gray-500">01-4567890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === "description" && (
              <div className="prose prose-orange max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Product Specifications
                </h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-100 pb-2">
                      <dt className="font-medium text-gray-900">{key}</dt>
                      <dd className="text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="text-center py-8 text-gray-500">
                  <p>Reviews feature would be implemented here.</p>
                  <p className="text-sm">
                    Current rating: {product.rating}/5 from{" "}
                    {product.reviewCount} customers
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

