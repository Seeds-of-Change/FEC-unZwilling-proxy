const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 80;

app.use('/', express.static(path.join(__dirname, '../client/dist')));
const Proxy = (targetUrl) => (req, res) => {
  axios.get(targetUrl + req.originalUrl + req.paramsId)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};

const proxyQuestions = Proxy('http://54.183.5.42');
const proxyReviews = Proxy('http://3.131.135.129');
const proxyFeatureExplorer = Proxy('http://3.101.127.251');
const proxyRelatedProducts = Proxy('http://18.144.2.219');
const proxyProductInfo = Proxy('http://3.129.22.244/');

app.use('/questions/:id', proxyQuestions);
app.use('/review/:id', proxyReviews);
app.use('/products/featureExplorer/:id', proxyFeatureExplorer);
app.use('/products/relatedProducts/:id', proxyRelatedProducts);
app.use('/relatedproducts/:id', proxyRelatedProducts);
app.use('/products/productInfo/:id', proxyProductInfo);

app.listen(port, () => {
  console.log(`Proxy running on port ${port}.`);
});
