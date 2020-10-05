const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
  target: 'http://localhost:8083',
  changeOrigin: true, // for vhosted sites, changes host header to target's host
  logLevel: 'debug',
});

const app = express();
const port = 2112;

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/questions/', proxy);

app.listen(port, () => {
  console.log(`Proxy running on port ${port}.`);
});
