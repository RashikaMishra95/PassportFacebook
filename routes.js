
var {User}=require('./models/Users');

module.exports=(app,passport)=>{

    app.get('/',(req,res)=>{
        console.log("In get ");
        res.send({msg:"success"});
    });
    app.get('/profile',(req,res)=>{
        res.send({msg:"user"});
    });

    // FACEBOOK ROUTES
    app.get('/auth/facebook', passport.authenticate('facebook',
        {  scope : ['public_profile', 'email']}
        )
    );

    app.get('/auth/facebook/callback',passport.authenticate('facebook', {

            successRedirect: '/profile',
            failureRedirect: '/'
        }
    ));

};