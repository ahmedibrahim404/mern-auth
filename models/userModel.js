// Require Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

// Create User Schema
const UserSchema = new Schema({
    username:{ type:String, required:true },
    email: { type:String, minlength:7, required:true },
    password:{ type:String, required:true },
    // check if Email Verified
    emailVerified:{ type:Boolean, default:false },
    // Email Token to Verify Accounts
    emailToken: { type:String },
    // salt For Password Hashing
    salt: { type:String }
});

const UserModel = mongoose.model('User', UserSchema);

// Generate Random to Email Tokens and Salt;
function generateRandom(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < n; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
  

// Auto Increment to User Id 
UserSchema.pre('save', function(next) {
    this.emailToken = generateRandom(100);
    this.salt = generateRandom(50);
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 100000, 64, 'sha512').toString('hex');
    next();
});

module.exports = UserModel;