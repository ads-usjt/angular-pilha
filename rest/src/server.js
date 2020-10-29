const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Helloow detective');
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`🧨 Server running at ${port}`));