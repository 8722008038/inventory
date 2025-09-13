// src/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 3000
});

const STORAGE_KEY = 'inventory_products_v1';

// --------- localStorage fallback helpers ----------
function seedLocalIfNeeded() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const now = Date.now();
    const seed = [
      { id: now + 1, name: 'Blue Sneaker', sku: 'SNK-001', description: 'Comfortable sports shoe', price: 49.99, quantity: 20 },
      { id: now + 2, name: 'Black Formal', sku: 'FRM-002', description: 'Leather formal shoe', price: 79.5, quantity: 10 },
      { id: now + 3, name: 'Running Socks', sku: 'SOC-003', description: 'Breathable cotton socks', price: 5.99, quantity: 100 }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
}
function readLocal() {
  seedLocalIfNeeded();
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function writeLocal(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// tryApi: run backend fn, else fallback to local
async function tryApi(backendFn, fallbackFn) {
  if (!API_BASE) {
    // no backend configured -> fallback immediately
    return fallbackFn();
  }
  try {
    return await backendFn();
  } catch (err) {
    console.warn('Backend request failed, using local fallback. Error:', err.message || err);
    return fallbackFn();
  }
}

// --------- public API methods used by UI ----------
export async function getProducts(search = '') {
  return tryApi(
    async () => {
      const res = await axiosInstance.get('/products', { params: { search } });
      return res.data;
    },
    () => {
      const all = readLocal();
      if (!search) return all.slice().sort((a,b) => b.id - a.id);
      const s = search.toLowerCase();
      return all.filter(p => (p.name||'').toLowerCase().includes(s)
                         || (p.sku||'').toLowerCase().includes(s)
                         || (p.description||'').toLowerCase().includes(s))
                .sort((a,b) => b.id - a.id);
    }
  );
}

export async function getProduct(id) {
  return tryApi(
    async () => {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    },
    () => {
      const all = readLocal();
      return all.find(p => p.id === Number(id));
    }
  );
}

export async function createProduct(payload) {
  return tryApi(
    async () => {
      const res = await axiosInstance.post('/products', payload);
      return res.data;
    },
    () => {
      const all = readLocal();
      const id = Date.now();
      const newItem = { ...payload, id };
      all.unshift(newItem);
      writeLocal(all);
      return newItem;
    }
  );
}

export async function updateProduct(id, payload) {
  return tryApi(
    async () => {
      const res = await axiosInstance.put(`/products/${id}`, payload);
      return res.data;
    },
    () => {
      const all = readLocal();
      const idx = all.findIndex(p => p.id === Number(id));
      if (idx === -1) throw new Error('Not found (local)');
      all[idx] = { ...all[idx], ...payload, id: Number(id) };
      writeLocal(all);
      return all[idx];
    }
  );
}

export async function deleteProduct(id) {
  return tryApi(
    async () => {
      await axiosInstance.delete(`/products/${id}`);
      return { ok: true };
    },
    () => {
      const all = readLocal();
      const filtered = all.filter(p => p.id !== Number(id));
      writeLocal(filtered);
      return { ok: true };
    }
  );
}
