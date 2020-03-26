const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../keys.js");
const db = require("../models");
const Users = db.Users;

// passport serialize/deserialize user info
passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    Users.findOne({ where: { id: id } }).then((user) => {
        done(null, user);
    });
});


passport.use(
    // google strategy setup
    new GoogleStrategy({
        callbackURL: "/auth/login/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // callback function
        // console.log("call back function fired!");
        Users.findOne({ where: { googleID: profile.id } }).then((currentUser) => {
            if (currentUser) {
                // user found
                console.log("user found!");
                // console.log(currentUser);
                done(null, currentUser.dataValues)
            } else {
                // user not found, create a new users in database
                Users.create({ name: profile.displayName, googleID: profile.id }).then(function (newUser) {
                    console.log("new user created!");
                    // console.log(newUser);
                    done(null, newUser.dataValues);
                });
            }
        });
    })
);