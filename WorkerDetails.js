const mongoose = require("mongoose");

const WorkerDetailSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    image:String,
    gender:String,
    profession:String,
    experience:Number,
    userType:String,
  },
  {
    collection: "WorkerInfo",
  }
);
module.exports = mongoose.model("WorkerInfo", WorkerDetailSchema);