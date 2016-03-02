var express = require('express');
var mongoose = require("mongoose");
var jwt = require("express-jwt");
var MongoClient = require('mongodb').MongoClient;

var config = require('../config/config');

var app = express();
var router = express.Router();

var User = mongoose.model("surveycreator");
var Survey = mongoose.model("survey");
var Administrator = mongoose.model("administrator");
var Response = require('../models/response');

var token = jwt({
    secret: "SECRET",
    userProperty: "payload"
});

app.use(token, router, function (req, res, next) {
    //console.log('Time: %d', Date.now());
})

router.route('/')
.get(function(req, res, next) {
    console.log('Time: %d', Date.now());
    Survey.find({
        "owner" : req.payload._id
    }, 
    function(err, surveys){
        if(err){
            return next(err);
        }
        //console.log(surveys);
        res.json(surveys);
    })
});

router.route('/create')
.post(function(req, res, next) {
    
    var json = req.body;
    //console.log(typeof(req.body));
    //console.log(req.body);
    var pages = JSON.parse(json.pages);
    //console.log(typeof(pages));
    var questions = {};
    var summery = {};
    pages.forEach(function(page) {
        page.elements.forEach(function(element) {
            if(element.type == "question"){
                //console.log(element);
                var question = {
                    type :element.question.type,
                    required : element.question.required,
                }
                
                summery[element.question.id] = {};
                
                switch(element.question.type){
                    case "text":
                        question.text = element.question.text;
                        question.analysable = false;
                        break;
                    case "textarea":
                        question.text = element.question.text;
                        question.analysable = false;
                        break;
                    case "radio":
                        question.analysable = true;
                        question.options = {};
                        element.question.offeredAnswers.forEach(function(answer) {
                            question.options[answer.id] = answer.value;
                            summery[element.question.id][answer.value] = 0;
                        }, this); 
                        if(element.question.otherAnswer){
                            question.options["other"] = "other";
                            summery[element.question.id]["other"] = 0;
                        }
                        break;
                    case "checkbox":
                        question.analysable = true;
                        question.options = {};
                        element.question.offeredAnswers.forEach(function(answer) {
                            question.options[answer.id] = answer.value;
                            summery[element.question.id][answer.value] = 0;
                        }, this);  
                        if(element.question.otherAnswer){
                            question.options["other"] = "other";
                            summery[element.question.id]["other"] = 0;
                        }
                        break;
                    case "grid":
                        question.analysable = false;
                        break;
                    case "priority":
                        question.analysable = false;
                        break;
                    case "division":
                        question.analysable = false;
                        break;
                    default:
                        break;
                }
                questions[element.question.id] = question;
                
            }
        }, this);
    }, this);
    
    console.log(questions);
    
    var survey = new Survey(req.body);
    survey.owner = req.payload._id;
    survey.questions = questions;
    survey.summery = summery;
    survey.save(function(err, survey){
        if(err){
            return next(err);
        }
        else{
            res.json(survey);
        }
    });
});

router.route('/questions/:id')
.get(function(req, res, next) {
      
    Survey.findById(req.params.id)
    .exec(function(err,survey) {
        if(err){
            res.json(err);
        }
        res.json(survey.questions);
    });
});
router.route('/question/:surveyid/:questionid')
.get(function(req, res, next) {
    console.log(req.params.surveyid);
    console.log(req.params.questionid);
    
    Survey.findById(req.params.surveyid)
    .exec(function(err,survey) {
        if(err){
            res.json(err);
        }
        var data = survey.summery[req.params.questionid];
        res.json(data);
    });
});

router.route('/analysis')
.post(function(req, res, next) {
    res.json(200);
});

module.exports = app;