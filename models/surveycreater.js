var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema({
    firstname : {
        type: String,
    },
    lastname : {
        type: String,
    },
    email : {
        type: String,
        unique: true
    },
    universityid : {
        type: String,
        lowercase: true,
        unique: true
    },
    faculty : {
        type: String
    },
    status : {
        type: String,
        enum : ["notactivated", "activated", "blocked"],
        default : "notactivated"
    },
    administrator : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "administrator"
    },
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
  return this.hash === hash;
};

UserSchema.methods.token = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    displayname: this.firstname,
    username: this.username,
    role : "surveycreator",
    exp: parseInt(exp.getTime() / 1000)
  }, "SECRET"); 
};

mongoose.model("surveycreator", UserSchema);
