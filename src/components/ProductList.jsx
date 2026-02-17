import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Filter,
  LayoutGrid,
  List,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

const ProductList = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products, categories, loading } = useProducts();
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ============================
     FILTER LOGIC (FIXED CLEAN)
  ============================ */
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // -------- CATEGORY FILTER --------
        if (categoryParam) {
          const productCategoryId =
            typeof p.category === "object"
              ? p.category?._id
              : p.category;

          if (productCategoryId !== categoryParam) return false;
        }

        // -------- SUBCATEGORY FILTER --------
        if (subcategoryParam) {
          const productSubName =
            typeof p.subcategory === "object"
              ? p.subcategory?.name
              : p.subcategory;

          if (productSubName !== subcategoryParam) return false;
        }

        // -------- BRAND FILTER --------
        if (
          selectedBrands.length &&
          !selectedBrands.includes(p.brand)
        )
          return false;

        // -------- PRICE FILTER --------
        if (p.price > priceRange) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      });
  }, [
    products,
    categoryParam,
    subcategoryParam,
    selectedBrands,
    priceRange,
    sortBy,
  ]);

  /* ============================
     HELPERS
  ============================ */
  const handleCategoryChange = (categoryId) => {
    if (categoryId === "all") {
      navigate("/products");
    } else {
      navigate(`/products?category=${categoryId}`);
    }
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const brands = [
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ];

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(price);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">All Products</h1>

            {categoryParam && (
              <p className="text-sm text-gray-600">
                Category Selected
              </p>
            )}

            {subcategoryParam && (
              <p className="text-sm text-orange-600">
                Subcategory: {subcategoryParam}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-orange-100 text-orange-600"
                    : ""
                }`}
              >
                <LayoutGrid size={18} />
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-orange-100 text-orange-600"
                    : ""
                }`}
              >
                <List size={18} />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center border px-3 py-2 rounded-lg"
            >
              <SlidersHorizontal size={16} className="mr-1" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* ================= SIDEBAR ================= */}
          <aside
            className={`w-64 bg-white p-5 rounded-lg shadow ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            <h3 className="font-semibold flex items-center mb-4">
              <Filter size={18} className="mr-2" />
              Filters
            </h3>

            {/* CATEGORY FILTER */}
            <div className="mb-5">
              <h4 className="font-medium mb-2">Category</h4>

              <label className="block">
                <input
                  type="radio"
                  checked={!categoryParam}
                  onChange={() =>
                    handleCategoryChange("all")
                  }
                />
                <span className="ml-2">All</span>
              </label>

              {categories.map((c) => (
                <label key={c._id} className="block">
                  <input
                    type="radio"
                    checked={categoryParam === c._id}
                    onChange={() =>
                      handleCategoryChange(c._id)
                    }
                  />
                  <span className="ml-2">{c.name}</span>
                </label>
              ))}
            </div>

            {/* BRAND FILTER */}
            <div className="mb-5">
              <h4 className="font-medium mb-2">Brand</h4>
              {brands.map((b) => (
                <label key={b} className="block">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                  />
                  <span className="ml-2">{b}</span>
                </label>
              ))}
            </div>

            {/* PRICE FILTER */}
            <div>
              <h4 className="font-medium mb-2">Max Price</h4>
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange}
                onChange={(e) =>
                  setPriceRange(+e.target.value)
                }
                className="w-full"
              />
              <p className="text-sm mt-1">
                {formatPrice(priceRange)}
              </p>
            </div>
          </aside>

          {/* ================= PRODUCTS ================= */}
          <div className="flex-1">
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                No products found
              </p>
            )}

            <div
              className={`grid ${
                viewMode === "grid"
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-6`}
            >
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() =>
                    navigate(`/products/${p._id}`)
                  }
                  className="bg-white rounded-lg shadow hover:shadow-lg cursor-pointer"
                >
                  <img
                    src={p.images?.[0]?.url}
                    alt={p.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">
                      {p.name}
                    </h3>
                    <p className="font-bold">
                      {formatPrice(p.price)}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(p._id);
                      }}
                      className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg flex justify-center"
                    >
                      <ShoppingCart
                        size={16}
                        className="mr-2"
                      />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
