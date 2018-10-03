const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secretKey, clientSite } = require('../config');
const { isAccount, createAccount, isAccountWithPassword, sendMail, activateAccountWithToken, validateEmail } = require('../functions');
const rateLimit = require("express-rate-limit");

// Handle Rate Limit of Routes ( Registering )
const createAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // per 15 min
    max: 4, 
    message:
      "Too many accounts created from this IP, please try again after an hour"
});

router.post('/register', createAccountLimiter, (req, res) => {
    var { username, email, password } = req.body;
    // Check that Email is Valid
    validateEmail(email).then((validatedEmail) => {
        if(validatedEmail){
            // Check that there is No Account with Username and Email
            isAccount(username, email).then((isAcc) => {
                if(isAcc == true){
                    res.send({
                        success:false,
                        message:'Username or Email already in!'
                    })
                } else {
                    // Create New Account
                    createAccount(username, password, email).then((user) => {
                        if(user){   
                            // Send Verification Mail
                            sendMail({
                                from: '...', 
                                to: user.email, 
                                subject: 'Activate Account',
                                text: 'Active your Account!', 
                                html: `<p>Here to Activate your Account</p><br><a href="http://localhost:8000/auth/activateAccount?token=${user.emailToken}">Click HERE!</a>`                   
                            });
                            res.send({
                                success:true,
                                message:`Successfuly Registering with Username ${req.body.username}`
                            });
                        } else {
                            res.send({
                                success:false,
                                message:`Failed! Try again...`
                            })
                        }
                    });
                }
            })        
        } else {
            res.send({
                success:false,
                message:`Failed! Error Email.`
            })
        }
    })
})

// Handle Login Request
router.post('/login', (req, res) => {
    var { username, password } = req.body;
    isAccountWithPassword(username, password).then((r) => {
        if(r){
            if(r.emailVerified == true){
                jwt.sign({ username:r.username, email:r.email }, secretKey, { expiresIn: '2h' }, (err, token) => {
                    res.send({
                        success:true,  
                        token
                    });
                });
            } else {
                res.send({
                    success:false,
                    message:"PLEASE Activate your Account."
                })
            }
        } else {
            res.send({
                success:false,
                message:"User NOT FOUND!"
            })    
        }
    })
});

router.post('/checkauth', function(req,res, next){
    var { token } = req.headers;
    jwt.verify(token, secretKey, (err, authData) => {        
        if(authData){
            isAccount(authData.username).then((user) => {
                if(user == true){
                    res.send({
                        success:true, 
                        username: authData.username
                    })
                } else {
                    res.send({
                        success:false
                    })        
                }
            })
        } else {
            res.send({
                success:false
            })
        }
    })
        
});

router.get('/activateAccount', (req, res) => {
    if(req.query['token']){
        activateAccountWithToken(req.query['token']).then((activated) => {
            if(activated == true){
                res.redirect(`${clientSite}/auth`)
            } else {
                res.redirect(`${clientSite}/auth?error=true`)
            }
        })
    }
})

module.exports = router;