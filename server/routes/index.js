var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Product = mongoose.model('Product');

router.get('/api/product/', function(req, res, next) {
  var results = req.query.results;
  var type = req.query.type;
  // TODO: implement pagination
  // var page = req.query.page;
  var maxResults = 0;
  var findParam = {};
  if (type) {
    findParam.type = type;
  }
  if (results) {
    maxResults = results;
  }
  Product.find(findParam).sort({title: 'asc'}).limit(maxResults).exec(function (err, products) {
    if (err) {
      return console.error(err);
    }
    res.render( 'index', {
      title : 'Products',
      products : products
    });
  });
});

var util = require('util');
router.post('/api/product/', function (req, res) {
  // look for existing product with same URL
  Product.findOne({"link": req.body.link}, function(err, product) {
    if(product) {
      console.log('updating existing product');
      product.title       = (product.title && product.title !== '') ? product.title : req.body.title;
      product.summary     = (product.summary && product.summary !== '') ? product.summary : req.body.summary;
      product.type        = (product.type && product.type !== '') ? product.type : req.body.type;
      product.source      = (product.source && product.source !== '') ? product.source : req.body.source;
      product.tags        = (product.tags && product.tags !== '') ? product.tags : req.body.tags;
      product.featureimg  = (product.featureimg && product.featureimg !== '') ? product.featureimg : req.body.featureimg;
      product.review      = (product.review && product.review !== '') ? product.review : req.body.review;
      product.quality     = (product.quality && product.quality !== -1) ? product.quality : req.body.quality;
      product.cost        = (product.cost && product.cost !== -1) ? product.cost : req.body.cost;
      product.sales       = (product.sales && product.sales !== -1) ? product.sales : req.body.sales;
      product.description = (product.description && product.description !== -1) ? product.description : req.body.description;
      product.updated_at  = Date.now();
      product.save( function ( err, product, count ) {
        if (err) {
          return console.error(err);
        }
        res.redirect('/api/product');
      });
    } else {
      new Product({
        title       : req.body.title,
        summary     : req.body.summary,
        type        : req.body.type,
        link        : req.body.link,
        source      : req.body.source,
        tags        : req.body.tags,
        featureimg  : req.body.featureimg,
        review      : req.body.review,
        visible     : req.body.visible,
        quality     : req.body.quality,
        cost        : req.body.cost,
        sales       : req.body.sales,
        description : req.body.description,
        updated_at  : Date.now()
      }).save( function( err, product, count ) {
        if (err) {
          return console.error(err);
        } else {
          console.log('saved product: '+product.link);
        }
        res.redirect('/api/product');
      });
    }
  });
});

router.post('/api/product/:id', function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    product.title       = req.body.title;
    product.summary     = req.body.summary;
    product.type        = req.body.type;
    product.link        = req.body.link;
    product.source      = req.body.source;
    product.tags        = req.body.tags;
    product.featureimg  = req.body.featureimg;
    product.review      = req.body.review;
    product.visible     = req.body.visible;
    product.quality     = req.body.quality;
    product.cost        = req.body.cost;
    product.sales       = req.body.sales;
    product.description = req.body.description;
    product.updated_at  = Date.now();
    product.save( function ( err, product, count ) {
      if (err) {
        return console.error(err);
      }
      res.redirect('/api/product');
    });
  });
});

router.get('/api/product/edit/:id', function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    res.render( 'product', {
      product : product
    });
  });
});

router.put('/api/product/', function (req, res) {
  res.send('Got a PUT request');
});

router.get('/api/product/delete/:id', function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    product.remove( function (err, product) {
      res.redirect('/api/product');
    });
  });
});

module.exports = router;
