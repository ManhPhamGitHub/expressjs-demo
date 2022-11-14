const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: String
    },
    imageUrl: {
        type: String
    }
})


module.exports = mongoose.model('user', userSchema)