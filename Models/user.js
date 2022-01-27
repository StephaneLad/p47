const mongoose = require('mongoose')
const uniquValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true}
})

userSchema.plugin(uniquValidator)

module.exports = mongoose.model('auth',userSchema)