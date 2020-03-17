const express = require('express');
const bodyParser = require('body-parser');

//db dependency
const moongose = require('mongoose');
moongose.Promise=global.Promise;

//Configuring Databse
const dbConfig = require('./config/database.config');

//Connecting Database
moongose.connect(dbConfig.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log("DB Connected Successfully.")
}).catch((err)=>{
    console.log("Could Not connecting to database:",err)
    process.exit();
})

//Create express App
const app= express();


//parse the request of content-type-application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//parse request of application/json
app.use(bodyParser.json());


//route
app.get('/',(req,res) => {
    res.json({"message":"Welcome to EasyNotes Application."});
});


//Require Note routes
require('./app/routes/note.routes')(app);
require('./app/routes/user.routes')(app);



//listen request on port 2050
app.listen("2050",()=>{
    console.log("Server Started and listing on port 2050.");
});