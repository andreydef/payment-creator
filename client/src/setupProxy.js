const proxy = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(proxy("/auth/", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/products", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/products/:id", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/paypal-pay", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/paypal-subscription", { target: "http://localhost:5000/" }))
  app.use(proxy("/profile/", { target: "http://localhost:5000/" }))
}
