const http = require("http");

const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT);

console.log(`*** RUNNING THE SERVER on PORT ${PORT} ***`);
