var express = require('express');
var mongoose = require("mongoose");
var jwt = require("express-jwt");

var app = express();
var router = express.Router();

var User = mongoose.model("surveycreator");
var Survey = mongoose.model("survey");
var Administrator = mongoose.model("administrator");

var token = jwt({
    secret: "SECRET",
    userProperty: "payload"
});

app.use(token, router, function (req, res, next) {
    console.log('Time: %d', Date.now());
})

router.route('/users')
.get(function(req, res, next) {
    User.find({
        "faculty" : req.payload.faculty
    }, 
    function(err, users){
        if(err){
            return next(err);
        }
        res.json(users);
    })
});

router.route('/notifications')
.get(function(req, res, next) {
    Administrator.findById(req.payload._id)
    .exec(function(err, admin){
        if(err){
            return next(err);
        }
        res.json(admin.activationrequests);
    });
});
router.route('/activateuser')
.post(function(req, res, next) {
    console.log(req.payload._id);
    res.json(200);
    /*
    Administrator.findById(req.payload._id)
    .exec(function(err, administartor){
        if(err){
            return next(err);
        }
        User.findById(req.params.id)
        .exec(function(err, user){
            if(err){
                return next(err);
            }
            
            user.status = "activated"
            user.save(function(err){
                if(err){
                    return next(err);
                }
                console.log(user.email);
                Administrator.findById(req.payload._id)
                .exec(function(err, admin){
                    admin.activationrequests.pull({
                        email: user.email
                    },function(err){
                        if(err){
                            return next(err);
                        }
                    })
                    admin.save(function(err){
                        if(err){
                            return next(err);
                        }
                        res.json(200);
                    })
                })
            })
        })
    });
    */
});

module.exports = app;