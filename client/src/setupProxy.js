const proxy = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(proxy("/auth/", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/current_user", { target: "http://localhost:5000/" }))

  app.use(proxy("/api/create-order", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/orders", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/orders/:id", { target: "http://localhost:5000/" }))

  app.use(proxy("/api/subscribe/cancel", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/pay", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/subscribe", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/subscribe/:id", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/paypal-subscribe/:id", { target: "http://localhost:5000/" }))

  app.use(proxy("/api/products", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/products/:id", { target: "http://localhost:5000/" }))

  app.use(proxy("/profile/", { target: "http://localhost:5000/" }))
}
