const mongoose = require('mongoose');
const { schema } = mongoose;
//define userSchema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowerCase: true,
        createIndex: true  //creates an index for the username field in users collection
    },
    password: {
        type: String
    }
});
module.exports = mongoose.model('User', userSchema)