// server.js

const express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

const PORT = 3001; // Choose any available port for your proxy server

app.use(cors()); // Enable CORS if necessary

// Define a route to forward requests to the API server
app.all('/api/student/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://172.16.201.75:8081',
    changeOrigin: true,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
