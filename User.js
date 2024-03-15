const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('./UserDetails')


const User = mongoose.model("UserInfo")
const registerUser = async (req, res) => {
    const { name, email, mobile, password, userType } = req.body;

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "User already exists!!" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({
            name: name,
            email: email,
            mobile,
            password: encryptedPassword,
            userType
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
}

const loginUser =  async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    const oldUser = await User.findOne({ email: email }) || await Worker.findOne({ email: email });

    if (!oldUser) {
        return res.send({ data: "User doesn't exists!!" });
    }
    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ email: oldUser.email }, process.env.JWT_SECRET);
        console.log(token);
        if (res.status(201)) {
            return res.send({
                status: "ok",
                data: token,
                userType: oldUser.userType,
            });
        } else {
            return res.send({ error: "error" });
        }
    }
}

const userData =  async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const useremail = user.email;

        User.findOne({ email: useremail }).then((data) => {
            return res.send({ status: "Ok", data: data });
        });
    } catch (error) {
        return res.send({ error: error });
    }
}

module.exports = registerUser;
module.exports = loginUser;
module.exports = userData;