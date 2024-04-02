const User = require("../models/User.js");
const nodemailer = require('nodemailer');

const check = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const passwordChangeURL = `http://localhost:3000/reset-password/${user.id}`;

            var transporter = nodemailer.createTransport({
                service: 'outlook',
                auth: {
                    user: 'sathvikchowdari@jmangroup.com',
                    pass: 'Jman@600113'
                }
            });

            var mailOptions = {
                from: 'sathvikchowdari@jmangroup.com',
                to: email,
                subject: 'Password Reset',
                text: `Dear ${user.firstName} ${user.lastName},

                A password change request has been initiated for your account with us.
                
                If you requested this change, please click on the following link to reset your password:
                
                ${passwordChangeURL}
                
                If you did not initiate this request or believe it was made in error, please ignore this email. Your account remains secure.
                
                If you have any concerns or require assistance, feel free to contact our support team.
                
                Best regards,
                Org Team
                `
            };
    
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: "Error sending email, Please try again!" });
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { check };
