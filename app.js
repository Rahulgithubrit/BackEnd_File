const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('./UserDetails')
require('./WorkerDetails')
require('dotenv').config();
const registerUser = require('./User')
const loginUser = require('./User')
const userData = require('./User')



mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log("Error", e);
    });


app.get("/", (req, res) => {
    res.send({ status: "Started" });
});

app.listen(process.env.PORT, () => {
    console.log("Node js server started.");
});

// This is User Section Code

const User = mongoose.model("UserInfo")
// Routes for user
app.post("/register", registerUser);
app.post("/login-user", loginUser);
app.post("/userdata", userData);


// This is Worker Section Code

const Worker = mongoose.model("WorkerInfo")

const registerWorker = require('./Worker')
const workerData = require('./Worker')

// Routes for worker
app.post("/register-worker", registerWorker);
app.post("/worker-data", workerData);

//This for the Worker Screen only to show them their profile

app.post("/workerdata", async (req, res) => {
    const { token } = req.body;
    try {
        const worker = jwt.verify(token, process.env.JWT_SECRET);
        const workeremail = worker.email;

        Worker.findOne({ email: workeremail }).then((data) => {
            return res.send({ status: "Ok", data: data });
        });
    } catch (error) {
        return res.send({ error: error });
    }
});

app.post("/hired", async (req, res) => {
    const { userData, worker } = req.body;
    try {
        const currentUser = await User.findById(userData._id);
        currentUser.hired.push(worker._id);
        currentUser.save()
            .then((data) => {
                return res.send({ status: "Ok", data: data });
            });
    } catch (error) {
        return res.send({ error: error });
    }
});

app.post("/worker-hired", async (req, res) => {
    const { userData } = req.body
    try {
        await User.findById(userData._id).populate("hired")
            .then((data) => {
                return res.send({ status: "Ok", data: data });
            });
    } catch (error) {
        return res.send({ error: error });
    }
});

