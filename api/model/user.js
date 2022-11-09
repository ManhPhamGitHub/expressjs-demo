const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: String
    }
})


module.exports = mongoose.model('user', userSchema)