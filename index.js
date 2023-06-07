const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const collection = require("./models/userModel");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//SignUp
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email } = req.body;
    const userCheck = await collection.findOne({ username: username });
    const emailCheck = await collection.findOne({ email: email });
    // console.log();
    if (userCheck) {
      return res.json({ msg: "Username already exists." });
    } else if (emailCheck) {
      return res.json({ msg: "Email is already registered." });
    } else {
      collection.insertMany(req.body);
      //   console.log(req.body);
      return res.json({ msg: "Registered successfully." });
    }
  } catch (error) {
    return res.json({ msg: "error" });
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const usernameCheck = await collection.findOne({ username: username });
    if (usernameCheck) {
      if (usernameCheck.password === password) {
        const token = jwt.sign(
          {
            username: usernameCheck.username,
            email: usernameCheck.email,
          },
          "JWT_SECRET",
          { expiresIn: "7days" }
        );
        return res.json({ msg: "Login Successful.", token: token });
      } else {
        return res.json({ msg: "Wrong Password." });
      }
    } else {
      return res.json({ msg: "Username is not registered." });
    }
  } catch (error) {
    res.json({msg:"Catch error"});
  }
});

//Home
app.post("/", async (req, res) => {
  try {
    const decodeToken = jwt.decode(req.body.token);
    if (decodeToken) {
      return res.json(decodeToken);
    } else {
      return res.json({ msg: "not loggedin" });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(5000, () => {
  console.log("Server 5000 running...");
});
