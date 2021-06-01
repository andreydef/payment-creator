import passport from 'passport'
import User from '../models/user'
import GoogleStrategy from 'passport-google-oauth20'
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.googleClientID,
            clientSecret: process.env.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({
                        //googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        photo: profile.photos[0].value.split("?")[0]
                    })
                        .save()
                        .then(user => done(null, user));
                }
            });
        }
    )
);