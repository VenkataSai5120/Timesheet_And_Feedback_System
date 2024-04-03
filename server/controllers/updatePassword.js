const User = require("../models/User");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const updateUserPassword = async (req, res) => {
    try {
        const { _id, password } = req.body;
        console.log(_id, password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { password: hashedPassword },
            { new: true }
        );

        var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'sathvikchowdari@jmangroup.com',
                pass: 'Jman@600113'
            }
        });

        var mailOptions = {
            from: 'sathvikchowdari@jmangroup.com',
            to: updatedUser.email,
            subject: 'Password Updated Successfully!',
            text: `Dear ${updatedUser.firstName} ${updatedUser.lastName},
         
            Your password has been updated successfully.
           
            Best regards,
            Org Team`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response)
            }
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Password updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { updateUserPassword };
