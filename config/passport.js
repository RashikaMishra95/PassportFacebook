const express=require('express');
const passport=require('passport');
const bodyParser=require('body-parser');
const {mongoose}=require("../db/conn");
const {User}=require("../models/Users");

const {fb}=require("../models/Users");
var FacebookStrategy = require('passport-facebook').Strategy;
//var LocalStrategy=require('passport-local').Strategy;
var configAuth=require("./auth");
var app=express();

passport.serializeUser((user,done)=>{
    console.log("serializer");
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    console.log("deserializer");
    done(null,user);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    encoded:true
}));
app.use(passport.initialize());
app.use(passport.session())
passport.use("facebook",new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    },
    // facebook will send back the token and profile
    (accessToken, refreshToken, profile, done)=> {
        // asynchronous // Event Loop
        console.log("In fb use");

        process.nextTick(()=> {

            // find the user in the database based on their facebook id
            fb.findOne({ 'id' : profile.id }, (err, user)=> {

                console.log('start fb')

                // if there is an error, stop everything and return that error connecting to the database
                if (err) return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new fb();

                    // set all of the facebook information in our fb model
                    newUser.fb.id    = profile.id; // set the users facebook id
                    newUser.fb.token = token; // we will save the token that facebook provides to the user
                    newUser.fb.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save().then((doc)=>{
                        console.log("Saved User :: = "+doc);
                        return doc;
                    }).catch((err)=>{
                        console.log("User Error :: = "+err);
                        return err;
                    });
                }

            });
        });

    }));





// passport.use('local',new LocalStrategy((username,password,done)=>{
//     User.findOne({"email":username},(err,user)=>{
//        if(err){
//            console.log("error");
//            return done(err)}
//        if(!user){
//            console.log("not found");
//            return done(false)}
//        if(user){
//            console.log("user Local :"+user);
//            return done(user)
//        }
//     });
    /*User.findOne({"email":username}).then((user)=>{
        console.log(username,password);
        //console.log(user);
        if(!user){
            console.log("inside if")
            return done(null,false);
        }
        return done(null,user);
    },(err)=>{return done(null,false)})*/
//}));
// app.post('/passUser',passport.authenticate('local',(req, res, err) => {
//     if(err) {
//         console.log(err);
//     }
//     res.json({message:"Success"});
// }));


// app.post('/passUser',passport.authenticate('local',(res)=>{
//     console.log('sucess');
//   res.json({message:"Success"});
// }));
// app.get('/suc',(req,res)=>{
//     res.json({message:"Success"});
// });
// app.get('/err',(req,res)=>{
//     console.log('Fail');
//     res.json({message:"Fail"});
// });

//insert
// app.post('/loginUser',(req,res)=>{
//     var usr=new loginUser({
//         username: req.body.username,
//         password: req.body.password
//     });
//     usr.save().then((docs)=>{
//         console.log(docs);
//         res.send(docs);
//     }).catch((err)=>{
//         console.log(err);
//         res.send(err);
//     });
// });
//get
// app.get('/loginUser',(req,res)=>{
//     loginUser.find().then((docs)=>{
//         console.log(docs);
//         res.send(docs);
//     }).catch((err)=>{
//         console.log(err);
//         res.send(err);
//     });
// });
require('../routes')(app,passport);
app.listen(4444,()=>{
    console.log('connected to server....');
});


