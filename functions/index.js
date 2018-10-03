const UserModel = require('../models/userModel');
const crypto = require('crypto');
const transporter = require('./email');

// Check if Account by Username or Email
module.exports.isAccount =  async function isAccount(username, email){
    this.isAcc = false;
    await UserModel.findOne({ $or: [ { username }, { email } ] }, function(err,user){
        if (user) {
            this.isAcc = true;
        }
    });
    return this.isAcc;
}


// Check if Account by Username or Email and Password
module.exports.isAccountWithPassword = async function isAccountWithPassword(username, password){
    this.isAcc = false;
    await UserModel.findOne({ $or: [ { username }, { email:username } ] }, async function(err,user){
        if (user) {
            if(user.password == crypto.pbkdf2Sync(password, user.salt, 100000, 64, 'sha512').toString('hex')){
                this.isAcc = user;
            }
        }
    });
    return this.isAcc;
}


// Create New Account using Username, Email and Password.
module.exports.createAccount =  async function createAccount(username, password, email){
    return await new UserModel({
        username,
        password,
        email
    }).save().then(async (user) => {
        if(user){
            return await user;
        } else {
            return await false;
        }
    })    
}

// Send Mail.
module.exports.sendMail = function sendMail(mailOptions){    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          throw error;
      }
  }); 
}

// Activate Account.
module.exports.activateAccountWithToken = async function activateAccountWithToken(token){
    this.isAcc = false;
    await UserModel.findOneAndUpdate({ emailToken:token, emailVerified:false }, { emailVerified:true }, async function(err,user){
        if (user) {
            this.isAcc = true;
        } 
    });
    return this.isAcc;
}


// Validate Email
module.exports.validateEmail = async function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return await re.test(String(email).toLowerCase());
}
