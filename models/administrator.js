
var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var AdministratorSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    email : {
        type: String,
    },
    faculty : {
        type: String,
    },
    
    activationrequests : [mongoose.Schema.Types.Mixed],
    
    hash: String,
    salt: String
});

AdministratorSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};

AdministratorSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
  return this.hash === hash;
};

AdministratorSchema.methods.token = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    displayname: 'Administrator Faculty:' + this.faculty,
    faculty : this.faculty,
    role : "admin",
    exp: parseInt(exp.getTime() / 1000)
  }, "SECRET"); 
};

mongoose.model("administrator", AdministratorSchema);

