
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBestDealProduct } from "../api/bestdealsProductAPi";

function BestDealsProduct() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const visibleItems = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getBestDealProduct();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load best selling products", error);
      }
    };
    fetchProducts();
  }, []);

  const next = () => {
    if (index < products.length - visibleItems) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Best Deals for you
      </h2>

      <div className="relative">
        {index > 0 && (
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow">
            <ChevronLeft />
          </button>
        )}

        {index < products.length - visibleItems && (
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow">
            <ChevronRight />
          </button>
        )}

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(-${index * 320}px)` }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="min-w-[300px] bg-white rounded-lg shadow hover:shadow-xl"
              >
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-t-lg"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-orange-600 font-bold mt-2">
                    Rs. {product.price}
                  </p>

                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestDealsProduct;

