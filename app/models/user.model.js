const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email:String,
    password: String, 
},
{
    timestamp:true
}
)
module.exports = mongoose.model('User',UserSchema);