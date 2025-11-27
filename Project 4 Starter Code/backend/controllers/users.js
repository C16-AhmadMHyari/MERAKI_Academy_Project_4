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
  const {password} = req.body
  try {
    const result = await userModel.findOne({ email }).populate("role");
    if (result) {
      res.status(200).json(result);
    }else{await res.status(404).json("Not Found")}
  } catch (err) {
    res.status(500).json("Servar Error");
  }
}; 

module.exports = { register, login };
