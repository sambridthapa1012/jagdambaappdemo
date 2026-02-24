import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const { categories, loading } = useProducts();
  const [openCategory, setOpenCategory] = useState(null);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  const handleCategoryClick = (id) => navigate(`/products?category=${id}`);
  const handleSubcategoryClick = (id, subName) =>
    navigate(`/products?category=${id}&subcategory=${encodeURIComponent(subName)}`);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-3 rounded"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow hover:shadow-lg">
              <div className="relative cursor-pointer">
                <img
                  src={category.image?.url}
                  alt={category.name}
                  onClick={() => handleCategoryClick(category._id)}
                  className="h-40 w-full object-cover rounded-t-lg"
                />
                <div className="p-4 text-center">
                  <div className="text-3xl">{category.icon}</div>
                  <h3
                    onClick={() => handleCategoryClick(category._id)}
                    className="font-semibold hover:text-orange-600"
                  >
                    {category.name}
                  </h3>

                  {category.subcategories?.length > 0 && (
                    <button
                      onClick={() =>
                        setOpenCategory(openCategory === category._id ? null : category._id)
                      }
                      className="text-sm text-gray-500 mt-2"
                    >
                      {openCategory === category._id
                        ? "Hide Subcategories"
                        : "View Subcategories"}
                    </button>
                  )}
                </div>
              </div>

              {openCategory === category._id &&
                category.subcategories?.length > 0 && (
                  <div className="border-t bg-gray-50 p-3 space-y-2">
                    {category.subcategories.map((sub, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleSubcategoryClick(category._id, sub)
                        }
                        className="block w-full text-sm text-gray-600 hover:text-orange-600 text-left"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;