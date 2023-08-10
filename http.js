const http = require("http");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

const server1 = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Server 1\n");
});

const server2 = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
});

const port1 = process.env.PORT1 || 3000;
const port2 = process.env.PORT2 || 4000;

server1.listen(port1, () => {
  console.log(`Server 1 is running on port ${port1}`);
});

server2.listen(port2, () => {
  console.log(`Server 2 is running on port ${port2}`);
});
