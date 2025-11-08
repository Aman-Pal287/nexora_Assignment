import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadproducts } from "../store/actions/productAction";
import { asyncAddToCart } from "../store/actions/cartAction";
import { toast } from "react-toastify";

export default function Product() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(asyncloadproducts());
  }, [dispatch]);

  return (
    <section className="font-[s-regular] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center">
          Product Listing
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.data?.length > 0 ? (
            products.data.map((p) => (
              <div
                key={p._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-md shadow">
                    New
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between h-48">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {p.description?.slice(0, 80) ||
                        "No description available."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{p.price.amount}
                    </span>
                    <button
                      onClick={() => {
                        dispatch(asyncAddToCart(p._id, 1));
                        toast.success(`${p.title} added to cart`, {
                          position: "bottom-right",
                          autoClose: 1200,
                        });
                      }}
                      className="px-4 py-2 text-sm font-semibold  bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 focus:ring-4 focus:ring-indigo-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-64">
              <div className="text-gray-500 text-lg animate-pulse">
                Loading products...
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
