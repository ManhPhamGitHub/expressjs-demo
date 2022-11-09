const express = require('express')
const app = express();
const port = 3001

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())


mongoose.connect('mongodb://localhost:27017/test')
    .then(() => { console.log("connected mongoDB!") })
    .catch(error => console.log("ERROR", error))

const routes = require('./api/routes/user')
routes(app)

app.listen(port, () => {
    console.log('Example app listen on port ', port);
})