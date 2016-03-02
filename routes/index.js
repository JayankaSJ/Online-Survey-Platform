var express = require('express');
var mongoose = require("mongoose");
var passport = require('passport');
var MongoClient = require('mongodb').MongoClient;

var router = express.Router();

var config = require('../config/config');
var User = mongoose.model("surveycreator");
var Survey = mongoose.model("survey");
var Administrator = mongoose.model("administrator");
var Response = require('../models/response');

var jwt = require("express-jwt");

/* GET home page. */
router.route('/')
.get(function(req, res, next) {
  res.render('index', { 
      title: 'Usurvey' 
  });
});

router.route('/config/:info')
.get(function(req, res, next) {
    var conf = config[req.params.info];
    res.json(conf);
});

router.route('/partials/:name')
.get(function(req, res, next) {
    res.render('partials/' + req.params.name, {
        title: 'Usurvey'
    });
});
router.route('/partials/user/:name')
.get(function(req, res, next) {
    res.render('partials/user/' + req.params.name, {
        title: 'Usurvey'
    });
});
router.route('/partials/administrator/:name')
.get(function(req, res, next) {
    res.render('partials/administrator/' + req.params.name, {
        title: 'Usurvey'
    });
});
router.route('/partials/survey/:name')
.get(function(req, res, next) {
    res.render('partials/survey/' + req.params.name, {
        title: 'Usurvey'
    });
});

router.route('/login')
.post(function(req, res, next) {
    passport.authenticate('surveycreator', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.send({
                retStatus : 'Success',
                token: user.token(),
                redirectTo: 'user',
            });
        }
        else {
            return next();
        }
    })(req, res, next);
})
.post(function(req, res, next) {
    passport.authenticate('administrator', function(err, administrator, info) {
        if (err) {
            return next(err);
        }
        if (administrator) {
            return res.send({
                retStatus : 'Success',
                token: administrator.token(),
                redirectTo: 'administrator',
            });
        }
        else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

router.route('/register')
.post(function(req, res, next) {
    /*
    if((req.body.firstname == "admin") && (req.body.lastname == "admin")){
        var administrator = new Administrator();
        administrator.name = "Administrator";
        administrator.email = req.body.email;
        administrator.faculty = req.body.faculty;
        administrator.setPassword(req.body.password);
        
        administrator.save(function(err) {
            if (err) {
                return next(err);
            }
            return res.send({
                retStatus : 'Success',
                token: administrator.token(),
                redirectTo: 'administrator',
            });
        })
    }
    else{
        
        var user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.faculty = req.body.faculty;
        user.universityid = req.body.universityid;
        user.setPassword(req.body.password);

        user.save(function(err) {
            if (err) {
                return next(err);
            }
            return res.send({
                retStatus : 'Success',
                token: user.token(),
                redirectTo: 'user',
            });
        })
   }*/
        var user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.status = "notactivated"
        user.faculty = req.body.faculty;
        user.universityid = req.body.universityid;
        user.setPassword(req.body.password);

        user.save(function(err) {
            if (err) {
                return next(err);
            }
            
            Administrator.findOne({
                faculty : req.body.faculty
            }, function(err, admin){
                if (err) {
                    return next(err);
                }
                admin.activationrequests.push(user);
                admin.save(function(err){
                    if (err) {
                        return next(err);
                    }
                });
                return res.send({
                    retStatus : 'Success',
                    administrator : admin
                    //token: user.token()
                    //redirectTo: 'user'
                });
            });
            
        })
});

router.route('/deploy/:id')
.get(function(req, res, next) {
    Survey.findOne({
        "_id" : req.params.id
    }, 
    function(err, survey){
        if(err){
            return next(err);
        }
        res.json(survey);
    })
})
.post(function(req, res, next){
        var answers = req.body;
        var mappedanswers = {};
        
        Survey.findById(req.params.id)
        .exec(function(err,survey) {
            var summery = {};
            summery = survey.summery;
            for(var key in answers){
                //* key is Question number 
                var answer = answers[key];
                var question = survey.questions[key];
                var mappedanswer = {
                    type : question.type,
                };
                switch(question.type){
                    case "text":
                    case "textarea":
                        mappedanswer.value = answer.answer;
                        break;
                    case "radio":
                        var value = question.options[answer.selectedAnswer];
                        if(value){
                            mappedanswer.value = value;
                            var count = summery[key][value];
                            summery[key][value] = count + 1;
                        }
                        else{
                            summery[key]["other"] += 1;
                        }
                        break;
                    case "check":
                        break;
                    default:
                        break;
                }
                mappedanswers[key] = mappedanswer;
            }
            Survey.findById(req.params.id, function(err, _survey){
                _survey.summery = summery;
                _survey.save(function(err){
                    if(err){
                        console.log(err);
                    }
                });
            });
            
            survey.mappedresponses.push(mappedanswers);
            
            survey.responses.push(req.body);
            survey.save(function(err){
                if(err){
                    res.json(err);
                }
            });
            res.json(200);
        });
        
    MongoClient.connect(config.database.fulluri, function(err, db) {
        if(err){
            throw err;
        }
        var collection = db.collection(req.params.id);
        collection.insert(mappedanswers);
        db.close();
    });
});

module.exports = router;


