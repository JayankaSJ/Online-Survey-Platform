var mongoose = require("mongoose");

var ActivationRequestSchema = new mongoose.Schema({
    survey : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "survey"
    },
    data : {
        type: String
    }
});

mongoose.model("notification", ActivationRequestSchema);
