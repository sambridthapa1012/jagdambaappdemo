import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Minus,
  Send,
  FileText,
  Phone,
  Users,
} from "lucide-react";
import { featuredProducts } from "../data/products";

const BulkOrder = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const addProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      { productId: "", quantity: 1 },
    ]);
  };

  const updateProduct = (index, field, value) => {
    const updated = [...selectedProducts];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedProducts(updated);
  };

  const removeProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bulkRequest = {
      customerName: customerInfo.customerName,
      phone: customerInfo.phone,
      email: customerInfo.email,
      company: customerInfo.company,
      products: selectedProducts.filter((p) => p.productId),
      message: customerInfo.message,
    };

    console.log("Bulk request submitted:", bulkRequest);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setSelectedProducts([]);
      setCustomerInfo({
        customerName: "",
        phone: "",
        email: "",
        company: "",
        message: "",
      });
    }, 3000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getEstimatedTotal = () => {
    return selectedProducts.reduce((total, item) => {
      const product = featuredProducts.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Request Submitted!
          </h2>
          <p className="text-gray-600 mb-4">
            We've received your bulk order request. Our team will contact you
            within 24 hours with a custom quote.
          </p>
          <p className="text-sm text-gray-500">
            Reference ID: #BULK{Date.now()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Bulk Order Request
            </h1>
            <p className="text-gray-600">
              Get special pricing for large quantity orders
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ठूलो मात्रामा अर्डरका लागि विशेष छुट
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Contractor Friendly</h3>
              <p className="text-sm opacity-90">
                Special rates for contractors and builders
              </p>
            </div>
            <div className="text-center">
              <FileText className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Custom Quotes</h3>
              <p className="text-sm opacity-90">
                Tailored pricing based on quantity
              </p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Dedicated Support</h3>
              <p className="text-sm opacity-90">
                Personal account manager assistance
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.customerName}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      customerName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="98xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  value={customerInfo.company}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Product Requirements
              </h2>
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>

            {selectedProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>
                  No products selected yet. Click "Add Product" to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedProducts.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <select
                        value={item.productId}
                        onChange={(e) =>
                          updateProduct(index, "productId", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select a product</option>
                        {featuredProducts.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {formatPrice(product.price)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          updateProduct(
                            index,
                            "quantity",
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateProduct(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-20 mx-2 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateProduct(index, "quantity", item.quantity + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right min-w-0">
                      {item.productId && (
                        <p className="text-sm font-semibold text-orange-600">
                          {formatPrice(
                            (featuredProducts.find((p) => p.id === item.productId)
                              ?.price || 0) * item.quantity
                          )}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedProducts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    Estimated Total:
                  </span>
                  <span className="text-2xl font-bold text-orange-600">
                    {formatPrice(getEstimatedTotal())}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  *Final pricing may vary based on quantity discounts and
                  current market rates
                </p>
              </div>
            )}
          </div>

          {/* Additional Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Additional Requirements
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Details & Special Requirements
              </label>
              <textarea
                value={customerInfo.message}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, message: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Please describe your project, timeline, delivery requirements, and any special considerations..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={
                !customerInfo.customerName ||
                !customerInfo.phone ||
                selectedProducts.length === 0
              }
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5 inline mr-2" />
              Submit Bulk Order Request
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Our team will review your request and provide a detailed quote
              within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkOrder;

