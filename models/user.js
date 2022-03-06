const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide name'],
        minLength : 3,
        maxLength : 30
    },
    email : {
        type : String,
        required : [true, 'Please provide email'],
        unique : true,
        validator : {
            validator : validator.isEmail,
            message : 'Please provide valid email'
        }
    },
    password : {
        type : String,
        required : [true, 'Please provide password'],
        minLength : 6
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    }
})

module.exports = mongoose.model('user', userSchema)