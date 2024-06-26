const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee.js");
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/;
const nodemailer = require("nodemailer");
const Mapping = require("../models/Mapping.js");

const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            contact,
            password,
            department,
            role
        } = req.body;

        console.log(req.body);

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const projectCount = await Employee.countDocuments() + 100000;

        const newUser = new Employee({
            ID: projectCount,
            firstName,
            lastName,
            department,
            role,
            email,
            contact,
            password: passwordHash,
        });

        console.log("creating user");
        const savedUser = await newUser.save();
        console.log("Employee Registered Successfully");

        // Check if role exists in mapping
        console.log("checking role")
        const existingMapping = await Mapping.findOne({ role });

        if (existingMapping) {
            existingMapping.employees.push(savedUser.ID);
            console.log("updating mapping")
            await existingMapping.save();
        } else {
            console.log("creating mapping")
            const newMapping = new Mapping({
                role,
                employees: [savedUser.ID]
            });
            await newMapping.save();
        }

        const loginURL = "http://localhost:3001/login";

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
            subject: 'Welcome to Org! Your account has been successfully created.',
            text: `Dear ${firstName} ${lastName},
         
            Welcome to Org! Your account has been successfully created.
           
            You can log in using the following URL:
            Login URL: ${loginURL}
           
            Your temporary password is: ${password}
           
            Please note that this password is only valid for only three times. Once you log in, we strongly recommend changing your password immediately for security purposes.
           
            If you have any questions or need further assistance, feel free to contact us.
           
            Best regards,
            Org Team`
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response)
            }
        });

        res.status(200).json(savedUser);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: err.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body.email);
        console.log(req.body.password);
        const user = await Employee.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "Employee does not exist. " });
        console.log(1);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        console.log(2);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log(3);
        const userObject = user.toObject();
        delete userObject.password;
        console.log(4);

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };