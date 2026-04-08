const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // 
const User = require('../models/user');

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.findById(id).then((user) => {
      done(null, user); //
   });
});

passport.use(
   new GoogleStrategy({
      callbackURL: 'http://localhost:8000/auth/google/callback',
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
   }, (accessToken, refreshToken, profile, done) => {

      User.findOne({ googleId: profile.id }).then((currentUser) => {
         if (currentUser) {
            console.log('User already exists');
            done(null, currentUser);
         } else {
            new User({
               username: profile.emails[0].value,
               googleId: profile.id
            }).save().then((newUser) => {
               console.log('New user created:', newUser);
               done(null, newUser);
            });
         }
      });
   })
);
