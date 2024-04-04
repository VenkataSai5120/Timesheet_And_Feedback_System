const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee.js");
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/;
const nodemailer = require("nodemailer");

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

        const id = await generateID(department, role, contact, email);

        console.log(req.body);

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new Employee({
            ID: id,
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

const generateID = (department, role, contact, email) => {
    const timestamp = new Date();
    // Extracting components from the timestamp
    const hour = timestamp.getHours().toString().padStart(2, '0');
    const minute = timestamp.getMinutes().toString().padStart(2, '0');
    const second = timestamp.getSeconds().toString().padStart(2, '0');
    const day = timestamp.getDate().toString().padStart(2, '0');
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const year = timestamp.getFullYear().toString().slice(-2);

    // Extracting individual characters
    const deptChar = department.charAt(0);
    const roleChar = role.charAt(0);
    const contactChar = contact.toString().charAt(0);
    const emailChar = email.charAt(0);

    // Generating the ID using relevant components
    const id = `${deptChar}${roleChar}${contactChar}${emailChar}${hour}${minute}${second}${day}${month}${year}`;
    return id;
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Employee.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "Employee does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const userObject = user.toObject();
        delete userObject.password;

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };