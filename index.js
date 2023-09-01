const express = require("express");
const server = express();
const productRouter = require("./routes/product");

//body parser
server.use(express.json());
server.use(express.static("public"));
server.use("/", productRouter.routes);

//MVC model-view-controller

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
