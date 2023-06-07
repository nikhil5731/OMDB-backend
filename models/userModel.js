const mongoose = require("mongoose");
const url = "mongodb+srv://nikhil0408:nikhil0408@registrationsdata.ukaq5yi.mongodb.net/";

mongoose
  .connect(url)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });

const newSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("userData", newSchema);

module.exports = collection;
