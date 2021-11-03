var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const User = require("./../user/userModel");

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    consumerKey: process.env.GOOGLE_CONSUMER_KEY,
    consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  async function(token, tokenSecret, profile, done) {
     const user = await User.findOne({email : profile.email[0].value});
     if(!user){
       const createdUser = await User.create({
         email: profile.email[0].value,
         name:profile.displayName
       });
       if(!createdUser){
         return `Something went wrong.`
       }
       return done(null, createdUser);
     }
     return done(null, user);
  }
));

// export
module.exports = { passport };