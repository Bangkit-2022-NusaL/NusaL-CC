const sendEmail = require("../util/sendEmail");
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; 
const initVector = crypto.randomBytes(16);
const Securitykey = crypto.randomBytes(32);
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
const User = require("../models/user");
const Token = require("../models/token");

exports.reset_sendemail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user){
            return res.status(400).json({
                message: "email doesn't exist"
            });
        }
        const unencryptedPassword = await req.body.password;
        if (!unencryptedPassword){
            return res.status(404).json({
                message: "need password"
            });
        }
        bcrypt.compare(unencryptedPassword, user.password, async (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Failed.'
                });
            }
            if (result){
                return res.status(409).json({
                    message: "Your new password is the same as your current password"
                });
            } else{
                let password = cipher.update(unencryptedPassword, "utf-8", "hex");
                password += cipher.final("hex");

                let token = await Token.findOne({ userId: user._id });
                if (!token) {
                    token = await new Token({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString("hex"),
                    }).save();
                }
                const url = req.protocol + '://' + req.get('host')
                const link = `${url}/password-reset/${user._id}/${token.token}/${password}`;
                const message = `This is ${user.name} NusaL Account password reset link:\n${link}\nIf this is not you, ignore this message.`
                await sendEmail(user.email, "Password reset", message);

                return res.status(201).json({
                    message: 'password reset link sent to your email account' 
                })
            }
        });
        // let password = cipher.update(unencryptedPassword, "utf-8", "hex");
        // password += cipher.final("hex");

        // if (!password){
        //     return res.status(409).json({
        //         message: "need password"
        //     });
        // }
        // let token = await Token.findOne({ userId: user._id });
        // if (!token) {
        //     token = await new Token({
        //         userId: user._id,
        //         token: crypto.randomBytes(32).toString("hex"),
        //     }).save();
        // }
        // const url = req.protocol + '://' + req.get('host')
        // const link = `${url}/password-reset/${user._id}/${token.token}/${password}`;
        // const message = `This is ${user.name} NusaL Account password reset link.\n${link}\nIf this is not you, ignore this message.`
        // await sendEmail(user.email, "Password reset", message);

        // return res.status(201).json({
        //     message: 'password reset link sent to your email account' 
        // })
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

exports.reset_password = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("<h1>invalid link or expired</h1>");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("<h1>Invalid link or expired</h1>");
        const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
        let decryptedData = decipher.update(req.params.password, "hex", "utf-8");
        decryptedData += decipher.final("utf8");

        bcrypt.hash(decryptedData, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                try {
                    user.password = hash;
                    await user.save();
                    await token.delete();
                    res.status(201).render('successReset');;
                } catch (error) {
                    res.status(500).json({
                        error: error
                    });
                }
            }
        });
    } catch (error) {
        res.status(501).send("<h1>An error occured</h1>");
    }
}