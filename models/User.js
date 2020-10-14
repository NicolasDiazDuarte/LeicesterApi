const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type:String,
        unique: true,
        lowercase: true,
        trim: true,
        required:true
    },
    user :{
        type: String,
        required:true
    
    },
    password: {
        type: String,
        required:true

    }
})
module.exports = mongoose.model('User',usersSchema)