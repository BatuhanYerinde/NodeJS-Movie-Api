const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
//Model
const User = require('../model/User');

router.post('/register', (req, res, next) => {
    const {username , password} = req.body;
    bcrypt.hash(password, saltRounds).then((hash) => {
        const user = new User({
            username,
            password : hash
        });
        const promise = user.save();
        promise.then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
    });
});
router.post('/authenticate', (req,res) =>{
    const {username , password} = req.body;
    User.findOne({
        username
    },(err, user) => {
        if(err)
            throw err;
        if(!user){
            res.json({
                status : false,
                message: 'Authentication failed, user not found.'
            });
        }else{
          bcrypt.compare(password , user.password).then((result) => {
             if(!result){
                 res.json({
                     status: false,
                     message: 'Authentication failed, wrong password.'
                 });
             }else{
                 const payload = {
                     username
                 };
                 const token = jwt.sign(payload, req.app.get('api_secret_key'),{
                    expiresIn: 720 //12 hour
                 });
                 res.json({
                     status: true,
                     token
                 });
             }
          });
        }
    });
});

module.exports = router;