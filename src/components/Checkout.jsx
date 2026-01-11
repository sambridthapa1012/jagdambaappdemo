import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    city: "",
    landmark: "",
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryFee = state.total >= 5000 ? 0 : 250;
  const totalAmount = state.total + deliveryFee;

const handlePlaceOrder = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/orders",
      {
        shippingInfo: shippingInfo,
        paymentMethod,
        deliveryMethod
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data.success) {
      setOrderPlaced(true);

      dispatch({ type: "CLEAR_CART" });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Order failed. Please try again.");
  }
};

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Your order has been received and is being processed. You will
            receive a confirmation call within 24 hours.
          </p>
          <p className="text-sm text-gray-500">Order ID: #NHW{Date.now()}</p>
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
            Back to Cart
          </button>

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-orange-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200"
                  }`}
                >
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Shipping</span>
              </div>

              <div
                className={`w-8 h-px ${
                  step >= 2 ? "bg-orange-600" : "bg-gray-300"
                }`}
              />

              <div
                className={`flex items-center ${
                  step >= 2 ? "text-orange-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200"
                  }`}
                >
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          fullName: e.target.value,
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
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="98xxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Ward no., Tole, Street name, House number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      value={shippingInfo.district}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          district: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select District</option>
                      <option value="kathmandu">Kathmandu</option>
                      <option value="lalitpur">Lalitpur</option>
                      <option value="bhaktapur">Bhaktapur</option>
                      <option value="pokhara">Pokhara</option>
                      <option value="chitwan">Chitwan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Kathmandu, Kaski"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.landmark}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          landmark: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Near school, temple, etc."
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Delivery Options
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={deliveryMethod === "standard"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="mt-1 text-orange-600"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-gray-600 mr-2" />
                          <span className="font-medium">Standard Delivery</span>
                          <span className="ml-2 text-sm text-gray-500">
                            (2-5 working days)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Free for orders above Rs. 5,000 in Kathmandu Valley
                        </p>
                      </div>
                      <span className="ml-auto font-semibold">
                        {state.total >= 5000 ? "Free" : "Rs. 250"}
                      </span>
                    </label>

                    <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={deliveryMethod === "express"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="mt-1 text-orange-600"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-orange-600 mr-2" />
                          <span className="font-medium">Express Delivery</span>
                          <span className="ml-2 text-sm text-gray-500">
                            (Same day/Next day)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Available in Kathmandu Valley only
                        </p>
                      </div>
                      <span className="ml-auto font-semibold">Rs. 500</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={
                    !shippingInfo.fullName ||
                    !shippingInfo.phone ||
                    !shippingInfo.address ||
                    !shippingInfo.city
                  }
                  className="w-full mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500">
                    <input
                      type="radio"
                      name="payment"
                      value="cash_on_delivery"
                      checked={paymentMethod === "cash_on_delivery"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-orange-600"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay when your order is delivered to your doorstep
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500">
                    <input
                      type="radio"
                      name="payment"
                      value="khalti"
                      checked={paymentMethod === "khalti"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-orange-600"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="font-medium">Khalti</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay securely using Khalti digital wallet
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500">
                    <input
                      type="radio"
                      name="payment"
                      value="esewa"
                      checked={paymentMethod === "esewa"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-orange-600"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium">eSewa</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay instantly using eSewa digital wallet
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 text-orange-600"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium">Bank Transfer</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Transfer to our bank account (Details provided after
                        order)
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold"
                  >
                    Back to Shipping
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-300 font-semibold"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatPrice(state.total)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Delivery:</span>
                  <span>
                    {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-orange-600">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Need help? Call 01-515825</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Delivery all over Kathmandu Valley</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

