const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
// const { User } = require("./../../user/userModel");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACKURL,
    },
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        const user = await User.findOne({name:profile.displayName, oAuth:{ github_id: profile.id}});
        if(!user){
          const createdUser = await User.create({
            name:profile.displayName,
            oAuth:{
                github_id : profile.id
            }
          });
          if(!createdUser){
            return console.log(`Something went wrong.`)
          }
          return console.log("account created;")
         //  return done(null, createdUser);
        }
        return console.log("Login Successfull.");
       //  return done(null, user);
    }
  )
);

module.exports = { passport };
