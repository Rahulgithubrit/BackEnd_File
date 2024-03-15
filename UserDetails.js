const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
    image:String,
    gender:String,
    profession:String,
    userType:String,
    hired:[{
      type : mongoose.Schema.Types.ObjectId,
      ref : "WorkerInfo"
    }]
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserDetailSchema);