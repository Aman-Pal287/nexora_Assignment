import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadproducts } from "../store/actions/productAction";

export default function Product() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  console.log(products.data);

  useEffect(() => {
    dispatch(asyncloadproducts());
  }, []);

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
                border: "1px solid #eee",
                borderRadius: "10px",
                padding: "16px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
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
              <h3 style={{ fontWeight: "bold", margin: "10px 0" }}>
                {p.title}
              </h3>
              <p style={{ color: "#666", fontSize: "14px" }}>
                {p.description?.slice(0, 60)}...
              </p>
              <p style={{ fontWeight: "bold", marginTop: "8px" }}>
                ₹{p.price.amount}
              </p>
              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#111",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => alert(`${p.title} added to cart (dummy)`)}
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
