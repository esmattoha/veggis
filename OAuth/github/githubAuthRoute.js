// Import Dependencies
const express = require("express");
const { passport } = require("./githubAuth");

const githubAuthRoute = express.Router();

githubAuthRoute.get("/auth-github", (req, res, next)=>{
    res.send('<a href="/auth/github">SIGN IN WITH GITHUB</a>');
})

githubAuthRoute.get("/auth/github", passport.authenticate("github"));

githubAuthRoute.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = { githubAuthRoute };
