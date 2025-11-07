import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadproducts } from "../store/actions/productAction";
import { asyncAddToCart } from "../store/actions/cartAction";
import { toast } from "react-toastify";

export default function Product() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  console.log(products.data);

  useEffect(() => {
    dispatch(asyncloadproducts());
  }, [dispatch]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-3xl font-bold mb-6">🛍️ Our Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.data?.length > 0 ? (
          products.data.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <img
                src={p.imageUrl}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3>{p.title}</h3>
              <p>₹{p.price.amount}</p>
              <button
                onClick={() => {
                  dispatch(asyncAddToCart(p._id, 1));
                  toast.success("added to card");
                }}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#111",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
