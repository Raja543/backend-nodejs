const fs = require("fs");
const express = require("express");
const server = express();

server.use(express.json());
server.use(express.static("public"));

// Load product data from JSON file
const rawData = fs.readFileSync("products.json", "utf-8");
const data = JSON.parse(rawData);
let products = data.products;

// Read the index.html template
const indexTemplate = fs.readFileSync("index.html", "utf-8");

// Endpoint to render product list in HTML format
server.get("/", (req, res) => {
  const renderedProducts = products.map((product) => {
    const productHTML = indexTemplate
      .replace("**thumbnail**", product.thumbnail)
      .replace("**title**", product.title)
      .replace("**description**", product.description)
      .replace("**price**", product.price)
      .replace("**rating**", product.rating);
    return productHTML;
  });

  const finalHTML = renderedProducts.join("");
  res.send(finalHTML);
});

// POST endpoint to add a new product
server.post("/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Assign a new ID
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET endpoint to retrieve all products
server.get("/products", (req, res) => {
  res.json(products);
});

// GET endpoint to retrieve a specific product by ID
server.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// PUT endpoint to update a product by ID
server.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { ...req.body, id }; // Preserve the existing ID
    res.status(202).json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// PATCH endpoint to partially update a product by ID
server.patch("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.status(202).json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// DELETE endpoint to delete a product by ID
server.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(202).json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
