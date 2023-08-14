const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
  } else if (req.url === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
