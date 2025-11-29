const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

const register = async (req, res) => {
  const { firstName, lastName, country, password, phoneNumber, role, email } =
    req.body;
  const newUser = new userModel({
    firstName,
    lastName,
    country,
    password,
    phoneNumber,
    role,
    email,
  });
  try {
    const result = await newUser.save();
    res.status(201).json({
      succes: true,
      message: "New User Added",
      newUser: result,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      succes: false,
      message: "Server Error",
      error: err,
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const { password } = req.body;
  try {
    const result = await userModel
      .findOne({ email: email.toLowerCase() })
      .populate("role");
    if (!result) {
      res.status(404).json("User not found");
    } else {
      const correctPassword = await bcrypt.compare(password, result.password);
      if (!correctPassword) {
        res.status(404).json("email or password is not correct");
      } else {
        const payload = {
          id: result.id,
          permissions: result.role.permissions,
        };

        const options = {
            expiresIn: "6h"
        }

        const token = jwt.sign(payload,process.env.SECRET,options ) 
        console.log(token);
               
        res.status(200).json("Welcome to OneHand");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Servar Error");
  }
};

module.exports = { register, login };
