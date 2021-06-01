import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import passport from 'passport'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'

import { auth } from './routes/auth.js'
import { posts } from './routes/posts.js'

const app = express()

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["somesecretsauce"]
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use('/', auth)
// app.use('/', posts)

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