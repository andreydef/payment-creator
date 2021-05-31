import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

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