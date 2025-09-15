import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📦 Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2">description</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.description}</td>
                <td className="p-2 border">₹{p.price}</td>
                <td className="p-2 border">{p.quantity}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
