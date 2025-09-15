import React, { useState, useEffect } from "react";

const ProductForm = ({ onCreate, editing, onUpdate, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // When editing, populate form
  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setDescription(editing.description);
      setPrice(editing.price);
      setQuantity(editing.quantity);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, description, price, quantity };

    if (editing) {
      onUpdate(editing.id, payload);
    } else {
      onCreate(payload); // 👈 call parent to add new product
    }

    // Clear form
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <h3>{editing ? "Edit Product" : "Add Product"}</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-1 w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border p-1 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        className="border p-1 w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        {editing ? "Update" : "Add"}
      </button>
      {editing && (
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProductForm;
