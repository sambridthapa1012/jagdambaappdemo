import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Package className="w-14 h-14 text-gray-400 mb-3" />
        <p className="text-gray-600 font-medium">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              {/* Order Header */}
              <div
                className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center cursor-pointer hover:bg-gray-50 transition"
                onClick={() =>
                  setOpenOrderId(openOrderId === order._id ? null : order._id)
                }
              >
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <p className="font-semibold text-orange-600 whitespace-nowrap">
                    Total: NPR {order.totalPrice}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize whitespace-nowrap ${
                      order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-600"
                        : order.orderStatus === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                  {openOrderId === order._id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {/* Order Items */}
              {openOrderId === order._id && (
                <div className="border-t bg-gray-50 p-4 space-y-3">
                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-gray-700 mt-2 sm:mt-0">
                          NPR {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Payment & Shipping Info */}
                  <div className="mt-4 bg-white p-3 rounded-lg shadow-sm border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Payment: <span className="font-medium">{order.paymentMethod}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Shipping: <span className="font-medium">{order.shippingInfo.address}, {order.shippingInfo.city}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
