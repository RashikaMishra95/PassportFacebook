const mongoose = require('mongoose');
//const validator = require('validator');
//var bcrypt=require('bcrypt');
var facebookSchema=new mongoose.Schema({
    facebook:{
        id:String,
        token:String,
        email:String,
        name:String
    }
});
var fb=mongoose.model("facebook",facebookSchema);

// var UserSchema=new mongoose.Schema({
//     uname:{
//         type: String,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 1,
//         unique: true,
//         validate: {
//             validator: validator.isEmail,
//             message: '{VALUE} is not a valid email'
//         }
//     },
//     hash_password: {
//         type: String,
//         require: true
//        // minlength: 6
//     },
//     created_date:{
//         type:Date,
//         default:Date.now()
//
//     }
//     // tokens: [{
//     //     access: {
//     //         type: String,
//     //         required: true
//     //     },
//     //     token: {
//     //         type: String,
//     //         required: true
//     //     }
//     // }]
// });

//var User = mongoose.model('User', UserSchema);

//module.exports = {User}
module.exports = {fb}