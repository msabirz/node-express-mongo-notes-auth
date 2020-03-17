const User = require('../models/user.model.js');
const config = require('../../config/database.config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//Create and save new note
exports.create = (req,res) => {
    //Validate request
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message:"Please provide credentials."
        });
    }

    //create note
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
    const user = new User({
        name: req.body.name || "New User",
        email: req.body.email,
        password:hashedPassword
    });

    //Save note in db
    user.save()
    .then(user=>{
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occured creating note"
        });
    });

};

//Find the single note with noteId
exports.getUserDetials = (req,res,next  ) => {
    
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    // jwt.verify(token, config.secret, function(err, decoded) {
    // if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // res.status(200).send(decoded);
//   });
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
    });
};

exports.login = (req,res) => {
     //Validate request
     if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            message:"Please provide credentials."
        });
    }


    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) 
            return res.status(500).send('Error on the server.');
        if (!user) 
            return res.status(404).send('No user found.');


        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) 
            return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 864000 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
      });
}