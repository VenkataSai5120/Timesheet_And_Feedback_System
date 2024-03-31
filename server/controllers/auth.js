const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/;

const register = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            password, 
        } = req.body;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password does not meet criteria." });
        }


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash, 
        });

        const savedUser = await newUser.save();
        console.log("User Registered Successfully");
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
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

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

module.exports = {register, login};