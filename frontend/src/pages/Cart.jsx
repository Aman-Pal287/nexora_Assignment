import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadCart,
  asyncAddToCart,
  asyncDecrementItem,
  asyncRemoveItem,
} from "../store/actions/cartAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, totals } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    dispatch(asyncLoadCart());
  }, [dispatch]);

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="font-[monospace] bg-gray-50 py-10 px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          🛒 Your Shopping Cart
        </h1>

        {/* CART TABLE */}
        <div className="overflow-x-auto bg-white shadow-sm rounded-2xl border border-gray-100">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6 text-center">Quantity</th>
                <th className="py-3 px-6 text-center">Price</th>
                <th className="py-3 px-6 text-center">Total</th>
                <th className="py-3 px-6 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img
                      src={item.productId?.imageUrl}
                      alt={item.productId?.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.productId?.title || "Unknown Product"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        ₹{item.productId?.price?.amount || 0} each
                      </p>
                    </div>
                  </td>

                  {/* Quantity Controls */}
                  <td className="text-center">
                    <div className="inline-flex items-center gap-3">
                      <button
                        onClick={() =>
                          dispatch(
                            asyncDecrementItem(
                              item.productId?._id || item.productId
                            )
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                      >
                        ➖
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            asyncAddToCart(
                              item.productId?._id || item.productId,
                              1
                            )
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                      >
                        ➕
                      </button>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="text-center text-gray-800 font-medium">
                    ₹{item.productId?.price?.amount || 0}
                  </td>

                  {/* Total */}
                  <td className="text-center text-indigo-600 font-semibold">
                    ₹{(item.productId?.price?.amount || 0) * item.quantity}
                  </td>

                  {/* Remove */}
                  <td className="text-center">
                    <button
                      onClick={() => {
                        dispatch(
                          asyncRemoveItem(item.productId?._id || item.productId)
                        );
                        toast.info("Item removed from cart");
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CART SUMMARY */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-white border border-gray-100 shadow-sm rounded-2xl p-6 gap-6">
          <div className="text-gray-700 space-y-2">
            <p>
              Total Items:{" "}
              <span className="font-semibold">{totals.itemCount}</span>
            </p>
            <p>
              Total Quantity:{" "}
              <span className="font-semibold">{totals.totalQuantity}</span>
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              Grand Total: ₹{totals.totalAmount}
            </h2>
          </div>

          <Link
            to="/checkout"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Proceed to Checkout ➡️
          </Link>
        </div>
      </div>
    </section>
  );
}
