var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {User} = require("./../../user/userModel");

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL,
  },
  async function(token, tokenSecret, profile, done) {
    console.log(profile);
     const user = await User.findOne({email : profile.emails[0].value});
     if(!user){
       const createdUser = await User.create({
         email: profile.emails[0].value,
         name:profile.displayName,
         oAuth:{
           google_id: profile.id
         }
       });
       if(!createdUser){
         return console.log(`Something went wrong.`)
       }
       return done(null, createdUser);
     }
     return done(null, user);
  }
));

// export
module.exports = { passport };