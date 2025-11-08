import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCheckout } from "../store/actions/checkoutAction";
import { useNavigate, Link } from "react-router-dom";
import { asyncLoadCart } from "../store/actions/cartAction";
import { toast } from "react-toastify";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totals } = useSelector((state) => state.cartReducer);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    dispatch(asyncLoadCart());
  }, [dispatch]);

  const handleCheckout = () => {
    if (cart.length === 0) return toast.warning("Cart is empty!");
    const formatted = cart.map((item) => ({
      productId: item.productId._id || item.productId,
      quantity: item.quantity,
    }));
    dispatch(asyncCheckout(formatted, setReceipt, navigate));
  };

  if (receipt) {
    return (
      <section className="font-[s-regular] bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center border border-gray-100">
          <h1 className="text-3xl font-extrabold text-green-600 mb-3">
            ✅ Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for shopping with{" "}
            <span className="font-semibold">Vibe Commerce</span> 💫
          </p>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-left mb-6">
            <p className="text-gray-700">
              <strong>Receipt ID:</strong> {receipt.id}
            </p>
            <p className="text-gray-700">
              <strong>Date:</strong>{" "}
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
          </div>

          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Order Summary
          </h2>
          <ul className="divide-y divide-gray-200 mb-6 text-left">
            {receipt.items.map((i) => (
              <li
                key={i.title}
                className="py-2 flex justify-between items-center"
              >
                <span className="text-gray-700">
                  {i.title} × {i.quantity}
                </span>
                <span className="font-semibold text-indigo-600">
                  ₹{i.lineTotal}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Total: ₹{receipt.total}
          </h2>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-all"
          >
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  //! Checkout Summary
  return (
    <section className="font-[s-regular] bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          🧾 Checkout Summary
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              to="/"
              className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Go Back to Shop
            </Link>
          </div>
        ) : (
          <>
            {/* //! order table */}
            <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-6 text-center">Qty</th>
                    <th className="py-3 px-6 text-center">Price</th>
                    <th className="py-3 px-6 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-800">
                        {item.productId?.title || "Unknown"}
                      </td>
                      <td className="text-center text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="text-center text-gray-800 font-medium">
                        ₹{item.productId?.price?.amount || 0}
                      </td>
                      <td className="text-center text-indigo-600 font-semibold">
                        ₹{(item.productId?.price?.amount || 0) * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* //! ORDER TOTAL  */}
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

              <button
                onClick={handleCheckout}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md"
              >
                Place Order 
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
