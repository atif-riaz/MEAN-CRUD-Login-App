var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* VERIFY USER EMAIL ON LOGIN */
router.post('/verify', function(req, res, next) {
  User.find({ email : req.body.email }, function (err, post) {
    if (err) return next(err);
    if (post.length > 0) res.json("error501_This Email is already taken.");
    else res.json(req.body);
  });
})

/* VERIFY USER EMAIL ON UPDATE */
router.post('/verifyedit', function(req, res, next) {
  User.find({ email : req.body.email }, function (err, post) {
    if (err) return next(err);
    if (post.length == 0) res.json(req.body);
    else if (post.length > 1) res.json("error501_This Email is already taken.");
    else 
    {
      if (post[0]._id == req.body._id) res.json(req.body);
      else res.json("error501_This Email is already taken.");
    }
  });
})

/* LOGIN USER */
router.post('/login', function(req, res, next) {
  User.find({ email : req.body.email }, function (err, post) {
    if (err) return next(err);
    if (post.length > 0)
    {
      let usr = post[0];
      if (usr.password == req.body.password)
      {
        res.json("valid201_" + usr._id);
      }
      else
      {
        res.json("Either the Email or the Password is incorrect.");
      }
    }
    else
    {
      res.json("This Email is not registered.");
    }
  });
})

/* SAVE USER */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;