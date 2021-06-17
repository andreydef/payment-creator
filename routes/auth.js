const passport = require("passport")

module.exports = app => {
  app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("/profile")
    } else {
      res.redirect("/")
    }
  })

  app.get("/auth/google",
      passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  )

  app.get("/auth/google/callback",
      passport.authenticate("google"),
    (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect("/profile")
      } else {
        res.redirect("/")
      }
    }
  )

  app.get("/api/logout", (req, res) => {
    req.logout()
    res.redirect("/")
  })

  app.get("/api/current_user", (req, res) => {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.sendStatus(403)
    }
  })
}
