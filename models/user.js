const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.validatePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('user', userSchema)