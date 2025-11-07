import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
  const { totals } = useSelector((state) => state.cartReducer);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Vibe<span className="text-indigo-600">Commerce</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 hover:text-indigo-600 transition ${
                isActive ? "font-semibold text-indigo-600" : ""
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative text-gray-700 hover:text-indigo-600 transition ${
                isActive ? "font-semibold text-indigo-600" : ""
              }`
            }
          >
            🛒 Cart
            {totals.totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full px-1.5">
                {totals.totalQuantity}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `text-gray-700 hover:text-indigo-600 transition ${
                isActive ? "font-semibold text-indigo-600" : ""
              }`
            }
          >
            💳 Checkout
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 flex flex-col items-center py-3 space-y-3">
          <NavLink
            onClick={() => setOpen(false)}
            to="/"
            className="text-gray-700 hover:text-indigo-600"
          >
            Products
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/cart"
            className="text-gray-700 hover:text-indigo-600"
          >
            Cart ({totals.totalQuantity})
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/checkout"
            className="text-gray-700 hover:text-indigo-600"
          >
            Checkout
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
