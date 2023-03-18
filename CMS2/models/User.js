const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    posts: 
    [
        {
        type: Schema.Types.ObjectId,
        ref: 'Post'
        }
    ]


})

module.exports = model("UserSchema", UserSchema)