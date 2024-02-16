const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//register user
const createUser = async (req, res) => {
  const { email } = req.body;
  // Check we have an email
  if (!email) {
    return res.status(422).send({ message: "Missing email." });
  }
  try {
    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).send({
        message: "Email is already in use.",
      });
    }
    // Step 1 - Create and save the user
    const user = await User.create({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    });

    return res.status(201).send({
      message: `user registration completeed`,
    });
  } catch (err) {
    return res.status(500).send({ error: err, message: `An error occured` });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    ///checking if the user has email and password
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json("please provide email and password");
    }
    const user = await User.findOne({ email });
    //checking if there is a user
    if (!user) {
      res.status(403).json("Invalid User");
    }
    ///checking if the user password is correct by using bcrypt.compare
    const ispasswordcorrect = await user.checkpassword(password);
    if (!ispasswordcorrect) {
      res.status(403).json("Invalid Password");
    }

    //sending the user name and token
    const token = user.createjwt();
    res.status(201).json({ user: { email: user.email }, token });
  } catch (error) {
    return res.status(500).send({ error: error, message: `An error occured` });
  }
};

const inputName = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );
    if (!updatedUser) {
      return res
        .status(400)
        .json({ msg: "FirstName and LastName not updated" });
    } else {
      return res
        .status(200)
        .json({
          updatedUser,
          msg: "FirstName and LastName updated sucessfully",
        });
    }
  } catch (error) {
    return res.status(500).send({ error: error, message: `An error occured` });
  }
};

module.exports = {
  createUser,
  loginUser,
  inputName,
};
