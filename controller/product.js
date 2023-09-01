const fs = require("fs");
// Load product data from JSON file
const rawData = fs.readFileSync("products.json", "utf-8");
const data = JSON.parse(rawData);
let products = data.products;

// Read the index.html template
const indexTemplate = fs.readFileSync("index.html", "utf-8");


exports.displayProducts = (req, res) => {
  const productHTMLList = products.map((product) => {
    const productHTML = indexTemplate
      .replace("**thumbnail**", product.thumbnail)
      .replace("**title**", product.title)
      .replace("**description**", product.description)
      .replace("**price**", product.price)
      .replace("**rating**", product.rating);
    return productHTML;
  });

  const combinedHTML = productHTMLList.join(""); // Combine the HTML strings
  res.send(combinedHTML); // Send the combined HTML as the response
};

exports.createProduct = (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Assign a new ID
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.getproductsall = (req, res) => {
  res.json(products);
};

exports.getproducts = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { ...req.body, id }; // Preserve the existing ID
    res.status(202).json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

exports.replaceProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...req.body };
    res.status(202).json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(202).json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
