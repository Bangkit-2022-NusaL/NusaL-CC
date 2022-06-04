const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 587,
            service:'yahoo',
            secure: false,
            auth: {
                user: "ardhisputra7@yahoo.com",
                pass: process.env.EMAIL_PW
            },
        });

        await transporter.sendMail({
            from: 'ardhisputra7@yahoo.com',
            to: email,
            subject: subject,
            text: text,
        });

    } catch (error) {
        return res.status(401).json({
            message: 'error'
        });
    }
};

module.exports = sendEmail;