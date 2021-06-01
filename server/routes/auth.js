import passport from 'passport'
import express from 'express'

const app = express();

export const auth = () => {
    app.get("/auth/test", (req, res) => {
        res.send("Auth Working properly");
    });
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ]
        }))
    app.get(
        "/auth/google/callback",
        passport.authenticate('google'),
        (req, res) => {
            res.redirect("/profile");
        }
    );
    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });
    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
}