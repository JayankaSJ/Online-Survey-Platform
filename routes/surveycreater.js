var express = require('express');
var mongoose = require("mongoose");
var jwt = require("express-jwt");

var app = express();
var router = express.Router();

var User = mongoose.model("surveycreator");
var Administrator = mongoose.model("administrator");

var token = jwt({
    secret: "SECRET",
    userProperty: "payload"
});

app.use(token, function (req, res, next) {
    console.log('Time: %d', Date.now());
    next();
})

router.route('/')
.get(function(req, res, next) {
  res.render('index', { 
      title: 'Usurvey' 
  });
});

module.exports = app;