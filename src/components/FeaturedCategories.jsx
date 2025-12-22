import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/products";

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Find everything you need for your construction project
          </p>
          <p className="text-sm text-gray-500 mt-1">
            श्रेणी अनुसार किनमेल गर्नुहोस्
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-1 aspect-h-1 h-32 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.nameNepali && (
                    <p className="text-xs text-gray-500 mt-1">
                      {category.nameNepali}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">
                    {category.subcategories.length} items
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

