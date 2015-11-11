var needle = require('needle');

var products = require('./data/themeforest-popular-20151110.json').products;

for(var i = 0; i < products.length; i++) {
  needle.post('http://localhost:3000/api/product', products[i], function(err, resp, body) {
    console.log(body);
    return;
  });
}
