module.exports = app => {
    const users = require('../controllers/user.controller');
    var auth = require('../auth/auth');

    //Create a new User
    app.post ('/user',users.create);
    

    //get user  from token
    app.get('/user',auth,users.getUserDetials);

    //login
    app.post('/login',users.login)
}