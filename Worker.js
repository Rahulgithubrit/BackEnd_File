const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('./UserDetails')


const User = mongoose.model("UserInfo")
const Worker = mongoose.model("WorkerInfo")


const registerWorker = async (req, res) => {
    const { name, email, mobile, password, userType, experience, profession } = req.body;

    const oldWorker = await Worker.findOne({ email: email });

    if (oldWorker) {
        return res.send({ data: "User already exists!!" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        await Worker.create({
            name: name,
            email: email,
            mobile,
            password: encryptedPassword,
            userType,
            experience,
            profession
        });
        res.send({ status: "ok", data: "User Created" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
}

const workerData =  async (req, res) => {
    try {
        Worker.find({}).then((data) => {
            return res.send({ status: "Ok", data: data, Worker });
        });
    } catch (error) {
        return res.send({ error: error });
    }
}

module.exports = registerWorker
module.exports = workerData