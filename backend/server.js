const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const FRONTEND_PATH = path.resolve(__dirname, "../frontend");

app.use(express.static(FRONTEND_PATH));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(FRONTEND_PATH, "index.html"));
});

/* PORT FOR RENDER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
/* Helper: read products */
function readProducts() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data || "[]");
}

/* Helper: write products */
function writeProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

/* GET all products */
app.get("/products", (req, res) => {
  const products = readProducts();
  res.json(products);
});

/* ADD product */
app.post("/products", (req, res) => {
  const products = readProducts();

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  };

  products.push(newProduct);
  writeProducts(products);

  res.json(newProduct);
});

/* DELETE product */
app.delete("/products/:id", (req, res) => {
  const products = readProducts();
  const id = Number(req.params.id);

  const updatedProducts = products.filter(p => p.id !== id);
  writeProducts(updatedProducts);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});