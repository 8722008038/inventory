// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productsRouter = require("./routes/products");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection

// PUT /api/products/:id
app.use("/api/products", productsRouter);

app.get("/", (req, res) => res.send("Mini Inventory API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
