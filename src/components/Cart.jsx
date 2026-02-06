import React from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Cart = ({ isOpen, onClose, onCheckout }) => {
  const { state, updateQuantity, removeItem } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shopping Cart ({state.itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-400">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                  >
                    

                    <img
                      src={item.images?.[0]?.url || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold text-orange-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="mx-2 text-sm font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">
                  Total:
                </span>
                <span className="text-2xl font-bold text-orange-600">
                  {formatPrice(state.total)}
                </span>
              </div>

              <button
                onClick={() => {
                  onCheckout();
                  onClose();
                }}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
