const express = require("express");
const router = express.Router();
const pool = require("../db");

// -------------------- GET /api/products --------------------
router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    // Query products with search + pagination
    const [rows] = await pool.query(
      `SELECT id, name, description, price, quantity, created_at, updated_at
       FROM products
       WHERE name LIKE ? OR description LIKE ?
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [`%${q}%`, `%${q}%`, limit, offset]
    );

    res.json({ data: rows });
  } catch (err) {
    console.error("Error in GET /api/products:", err);
    res.status(500).json({ error: err.message }); // return the real SQL error
  }
});

// -------------------- POST /api/products --------------------
router.post("/", async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ error: "Name, price, and quantity are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)",
      [name, description, price, quantity]
    );

    const [newProduct] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(newProduct[0]);
  } catch (err) {
    console.error("Error in POST /api/products:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- PUT /api/products/:id --------------------
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const [result] = await pool.query(
      "UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?",
      [name, description, price, quantity, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [updatedProduct] = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    res.json(updatedProduct[0]);
  } catch (err) {
    console.error("Error in PUT /api/products/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DELETE /api/products/:id --------------------
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error in DELETE /api/products/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
