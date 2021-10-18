require('dotenv').config()

const express = require('express')
const User = require('./db/db')
const router = require('./routes/routes')
const bodyParser = require('body-parser')
const app = express()


app.use(express.json())


app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is up and running on port ${3000}`)
})