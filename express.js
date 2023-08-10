const express = require("express");

const app = express();

const data = require("./data.json");

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/api", (req, res) => {
  res.json(data);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
