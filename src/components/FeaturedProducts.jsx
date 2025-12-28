import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Eye, Award } from "lucide-react";
import { featuredProducts } from "../data/products";
import { useCart } from "../context/CartContext";

const FeaturedProducts = () => {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Best-selling items for your construction needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 9).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {product.isSale && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                    SALE
                  </span>
                )}

                {product.isMadeInNepal && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Made in Nepal
                  </div>
                )}

                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}`);
                    }}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>

                {product.nameNepali && (
                  <p className="text-sm text-gray-500 mb-2">
                    {product.nameNepali}
                  </p>
                )}

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.reviewCount})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{product.brand}</span>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-300 flex items-center justify-center font-medium"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>

                {product.stockQuantity < 10 && (
                  <p className="text-red-600 text-sm mt-2 text-center">
                    Only {product.stockQuantity} left in stock
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-semibold"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

