var mongoose = require("mongoose");

module.exports = {

    dynamicschema : function(surveyid){
        
        var Schema = new mongoose.Schema(
            {
                //type: mongoose.Schema.Types.Mixed
            },
            {
                strict : false
            });
        return mongoose.model(surveyid, Schema);
        
    }
}


