const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const donationModel = require("../models/donations");


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
          expiresIn: "6h",
        };

        const token = jwt.sign(payload, process.env.SECRET, options);

        res.status(200).json({
          success: true,
          userId: result.id,
          firstName: result.firstName,
          role: result.role,
          token: token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Servar Error");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const donations = await donationModel
      .find({ user: id })
      .populate("category", "name")
      .populate("package", "title")
      .sort({ date: -1 });

    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
      },
      donations: donations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.find({}).populate("role");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { register, login, getAllUsers, getUser };
