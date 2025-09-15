import axios from "axios";

const api = {
  listProducts(query) {
    return axios.get("http://localhost:5000/api/products", {
      params: { q: query },
    });
  },
  createProduct(payload) {
    return axios.post("http://localhost:5000/api/products", payload);
  },
  updateProduct(id, payload) {
    return axios.put(`http://localhost:5000/api/products/${id}`, payload);
  },
  deleteProduct(id) {
    return axios.delete(`http://localhost:5000/api/products/${id}`);
  },
};

export default api;
