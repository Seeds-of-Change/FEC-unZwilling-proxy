const express = require('express');
const path = require('path');
const axios = require('axios');

// const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 2112;

app.use('/', express.static(path.join(__dirname, '../client/dist')));

// app.use('/products', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
// app.use('/relatedproducts', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
// app.use('/productfeatures', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
// app.use('/review', createProxyMiddleware({ target: 'http://localhost:7777', changeOrigin: true }));
// app.use('/questions', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

const Proxy = (targetUrl) => (req, res) => {
  axios.get(targetUrl + req.originalUrl + req.params.id)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};

const proxyQuestions = Proxy('http://localhost:3003');
const proxyReviews = Proxy('http://localhost:7777');
const proxyProductInfo = Proxy('http://localhost:3002');
const proxyRelatedProducts = Proxy('http://localhost:3001');
const productfeatures = Proxy('http://localhost:3000');

app.use('/product/:id', proxyProduct);

app.use('/questions/:id', proxyQuestions);
app.use('/review/:id', proxyReviews);
app.use('/products/:id', proxyProductInfo);
app.use('/relatedproducts/:id', proxyRelatedProducts);
app.use('/productfeatures/:id', productfeatures);

app.listen(port, () => {
  console.log(`Proxy running on port ${port}.`);
});

// stretch - one product id to rule them all
// const proxyProduct = (req, res) => {
//  forward to endpoints for
//    questions
//    reviews
//    product info
//    related products
//    product explorer
