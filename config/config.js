/* Collections */
var mongoose = require("mongoose");
var Administrator = mongoose.model("administrator");

module.exports = {
    /* Database */
    database : {
        uri : 'mongodb://127.0.0.1',
        ip : '127.0.0.1',
        port : 27017,
        database : 'usurvey',
        fulluri :'mongodb://127.0.0.1:27017/usurvey'
    },
    
    /* Collections */
    'surveycreators' : 'surveycreators',
    
    
    faculties : [
        {
            name : 'Art',
            admin : 'usurvey_admin'
        },
        {
            name : 'UCSC',
            admin : 'usurvey_admin'
        },
        {
            name : 'Science',
            admin : 'usurvey_admin'
        },
        {
            name : 'Management',
            admin : 'usurvey_admin'
        }
    ],
    
    addadministrators : function(){
        var data = [
            {
                name : "Administrator@UCSC",
                email : "admin@art.com",
                faculty : "UCSC",
                password : "admin"
            },
            {
                name : "Administrator@Science",
                email : "admin@art.com",
                faculty : "Science",
                password : "admin"
            }
        ]
        
        for(var i in data){
            var admin = data[i];           
            var administrator = new Administrator();
            administrator.name = admin.name
            administrator.email = admin.email;
            administrator.faculty = admin.faculty;
            administrator.setPassword(admin.password);
            administrator.save(function(err){
                if(err){
                    console.log(err)
                }
            });
        }

    }
}