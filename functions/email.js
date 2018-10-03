// Handle Host and Port to MAIL!
const { email } = require('../config');
const nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587 ,
    secure: false,
    auth: {
        user: email.username, 
        pass: email.password
    }
});