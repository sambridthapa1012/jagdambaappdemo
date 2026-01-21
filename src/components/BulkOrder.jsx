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
import { useProducts } from "../context/ProductContext";

const BulkOrder = () => {
  const navigate = useNavigate();
  const { products = [], loading } = useProducts();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });

  /* -------------------- Helpers -------------------- */

  const addProduct = () => {
    setSelectedProducts((prev) => [
      ...prev,
      { productId: "", quantity: 1 },
    ]);
  };

  const updateProduct = (index, field, value) => {
    setSelectedProducts((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const removeProduct = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const formatPrice = (price = 0) =>
    new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const getEstimatedTotal = () =>
    selectedProducts.reduce((total, item) => {
      const product = products.find((p) => p._id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

  /* -------------------- Submit -------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customerName: customerInfo.customerName,
      phone: customerInfo.phone,
      email: customerInfo.email,
      company: customerInfo.company,
      message: customerInfo.message,
      products: selectedProducts.filter((p) => p.productId),
    };

    try {
      const res = await fetch("http://localhost:5000/api/bulk-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);

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
    } catch (err) {
      console.error(err);
      alert("Failed to submit bulk order. Please try again.");
    }
  };

  /* -------------------- UI States -------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Our team will contact you within 24 hours.
          </p>
          <p className="text-sm text-gray-500">
            Reference ID: #BULK{Date.now()}
          </p>
        </div>
      </div>
    );
  }

  /* -------------------- Main UI -------------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b py-4">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-600 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>

          <h1 className="text-3xl font-bold text-center">
            Bulk Order Request
          </h1>
          <p className="text-center text-gray-500">
            Special pricing for large quantity orders
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto px-4 py-8 space-y-8"
      >
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["customerName", "Full Name *"],
              ["phone", "Phone Number *"],
              ["email", "Email"],
              ["company", "Company"],
            ].map(([key, label]) => (
              <input
                key={key}
                required={label.includes("*")}
                placeholder={label}
                value={customerInfo[key]}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, [key]: e.target.value })
                }
                className="border px-3 py-2 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <button
              type="button"
              onClick={addProduct}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </button>
          </div>

          {selectedProducts.map((item, index) => {
            const product = products.find(
              (p) => p._id === item.productId
            );

            return (
              <div
                key={index}
                className="flex gap-4 items-center mb-4 border p-4 rounded-lg"
              >
                <select
                  value={item.productId}
                  onChange={(e) =>
                    updateProduct(index, "productId", e.target.value)
                  }
                  className="flex-1 border px-3 py-2 rounded"
                >
                  <option value="">Select product</option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name} — {formatPrice(p.price)}
                    </option>
                  ))}
                </select>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      updateProduct(index, "quantity", Math.max(1, item.quantity - 1))
                    }
                  >
                    <Minus />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateProduct(index, "quantity", Number(e.target.value) || 1)
                    }
                    className="w-16 mx-2 text-center border rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateProduct(index, "quantity", item.quantity + 1)
                    }
                  >
                    <Plus />
                  </button>
                </div>

                <span className="text-orange-600 font-semibold">
                  {formatPrice((product?.price || 0) * item.quantity)}
                </span>

                <button onClick={() => removeProduct(index)}>
                  <Minus className="text-red-500" />
                </button>
              </div>
            );
          })}

          {selectedProducts.length > 0 && (
            <div className="text-right font-bold text-xl mt-4">
              Estimated Total: {formatPrice(getEstimatedTotal())}
            </div>
          )}
        </div>

        {/* Message */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <textarea
            rows="4"
            value={customerInfo.message}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, message: e.target.value })
            }
            placeholder="Additional requirements..."
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={
              !customerInfo.customerName ||
              !customerInfo.phone ||
              selectedProducts.length === 0
            }
            className="bg-orange-600 text-white px-8 py-3 rounded-lg disabled:opacity-50"
          >
            <Send className="inline mr-2" />
            Submit Bulk Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkOrder;
