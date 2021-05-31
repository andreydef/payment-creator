import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'
import cookieSession from 'cookie-session'

const app = express()

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["somesecretsauce"]
    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


dotenv.config()

const uri = process.env.mongoURI
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send("Welcome to Payment creator on MERN stack")
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})