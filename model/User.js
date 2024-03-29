const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        minLength: 5
    }
});
module.exports = mongoose.model('users',UserSchema);