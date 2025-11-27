const mongoose = require("mongoose");
const express = require("express");
const packageModel = require("../models/packages");

const createNewPackage = async (req, res) => {
  const { title, description, imgSource, urgent, category } = req.body;
  const newPackage = new packageModel({
    title,
    description,
    imgSource,
    urgent,
    category,
  });
  try {
    const result = await newPackage.save();
    res.status(201).json({
        success:true,
        message:"New Package created",
        result:result
    });
  } catch (err) {
    res.status(500).json("Server Error")
  }
};

module.exports = { createNewPackage };
