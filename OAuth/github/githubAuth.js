const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACKURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

module.exports = { passport };
