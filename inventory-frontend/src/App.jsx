import React, { useEffect, useState } from "react";
import api from "./api";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await api.listProducts(query);
      setProducts(res.data.data || []);
    } catch (e) {
      console.error(e);
      alert(e.error || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [query]);

  async function handleCreate(payload) {
    try {
      await api.createProduct(payload);
      setQuery(""); // refresh
      load();
    } catch (e) {
      console.error(e);
      alert(e.error || "Failed to create");
    }
  }

  async function handleUpdate(id, payload) {
    try {
      await api.updateProduct(id, payload);
      setEditing(null);
      load();
    } catch (e) {
      console.error(e);
      alert(e.error || "Failed to update");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.deleteProduct(id);
      load();
    } catch (e) {
      console.error(e);
      alert(e.error || "Failed to delete");
    }
  }

  return (
    <div className="container">
      <h1>Mini Inventory</h1>
      <div className="top">
        <SearchBar value={query} onChange={setQuery} />
        <ProductForm
          onCreate={handleCreate}
          editing={editing}
          onUpdate={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductList
          products={products}
          onEdit={(p) => setEditing(p)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
