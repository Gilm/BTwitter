/**
 * New node file
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Account = new Schema({
    userName: String,
    userEmail: String,
    password: String,
    confirmPassword: String,
});

module.exports = mongoose.model('Account', Account);