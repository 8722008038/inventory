import React, { useState } from "react";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", sku: "SKU123", description: "High-performance laptop" },
    { id: 2, name: "Mouse", sku: "SKU124", description: "Wireless mouse" },
    { id: 3, name: "Keyboard", sku: "SKU125", description: "Mechanical keyboard" },
  ]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📦 Mini Inventory</h1>
      <ProductForm onAdd={addProduct} />

      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <b>{p.name}</b> ({p.sku}) — {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
