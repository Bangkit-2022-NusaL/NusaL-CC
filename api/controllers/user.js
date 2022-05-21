const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');

exports.user_signup = async (req, res, next) => {
    try {
        const user = await User.find({email: req.body.email}).exec();
        if (user.length >= 1) {
            return res.status(409).json({
              message: "email exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    try {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        const result = await user.save();
                        console.log(result)
                        res.status(201).json({
                            message: 'User Created' 
                        })
                    } catch (error) {
                        res.status(500).json({
                            error: error
                        });
                    }
                }
            }); 
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

exports.user_login = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email}).exec();
        if (user.length < 1){
            return res.status(401).json({
                message: 'Auth Failed'
            });
        } 
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            if (result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Auth Failed'
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          error: error
        });
    }
}

exports.user_delete = async (req, res, next) => {
    try {
        await User.deleteOne({ _id: req.params.userId }).exec();
        res.status(200).json({
            message: "User deleted"
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          error: error
        });
    }
    
}