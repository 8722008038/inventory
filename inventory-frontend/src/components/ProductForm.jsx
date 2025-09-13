import React, { useState } from "react";

function ProductForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", sku: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    onAdd(form);
    setForm({ name: "", sku: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="sku"
        placeholder="SKU"
        value={form.sku}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ProductForm;
