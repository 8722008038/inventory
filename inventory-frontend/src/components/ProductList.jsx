import React, { useState } from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  // Filter products by search
  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

  // Edit logic
  const editProduct = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit({ ...selectedProduct, ...editForm });
    setSelectedProduct(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          📦 Product List
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center py-10 text-slate-500">
            No products available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="bg-white border-b hover:bg-slate-50"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap"
                    >
                      {p.id}
                    </th>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">{p.description}</td>
                    <td className="px-6 py-4">₹{p.price}</td>
                    <td className="px-6 py-4">{p.quantity}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => editProduct(p)}
                          className="font-medium text-blue-600 hover:underline m-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className=" font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedProduct && (
          <form
            className="mt-6 p-4 border rounded bg-[#8a2be2]"
            onSubmit={handleEditSubmit}
          >
            <h3 className="text-lg font-bold mb-2">
              Edit Product (ID: {selectedProduct.id})
            </h3>
            <div className="mb-2">
              <label className="block mb-1">Name:</label>
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Description:</label>
              <input
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Price:</label>
              <input
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                className="border px-2 py-1 w-full"
                type="number"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Quantity:</label>
              <input
                name="quantity"
                value={editForm.quantity}
                onChange={handleEditChange}
                className="border px-2 py-1 w-full"
                type="number"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 rounded border"
              onClick={() => setSelectedProduct(null)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductList;
