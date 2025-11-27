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
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createNewPackage };
