var mongoose = require("mongoose");

var SurveySchema = new mongoose.Schema({
    name : {
        type: String,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "surveycreator"
    },
    description : {
        type: String,
    },
    pages : {
        type: String,
    },
    state : {
        type: String,
    },
    questions : {
        type: mongoose.Schema.Types.Mixed,
    },
    summery : {
        type: mongoose.Schema.Types.Mixed,
    },
    responses : [mongoose.Schema.Types.Mixed],
    mappedresponses : [mongoose.Schema.Types.Mixed]
});

mongoose.model("survey", SurveySchema);
