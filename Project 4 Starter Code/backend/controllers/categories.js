const mongoose = require("mongoose");
const categoryModel = require("../models/categories");

const makeNewCategory = async (req, res) => {
  const { title, description, imgSource } = req.body;
  const newCategory = new categoryModel({
    title,
    description,
    imgSource,
  });
  try {
    const result = await newCategory.save();
    res.status(201).json({
      succes: true,
      message: "New category created",
      result: result,
    });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

const getAllCategories = async (req, res) => {
  try {
    const result = await categoryModel.find({});
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        result: result,
      });
    } else {
      res.status(404).json("There is no category");
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

const findCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await categoryModel.findOne({ _id: id });
    if (result) {
      res.status(200).json({
        success: true,
        result: result,
      });
    } else {
      res.status(404).json("there is no category with this id");
    }
  } catch (err) {
    res.status(500).json("server error");
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const {title,description,imgSource} = req.body
  try {
    const result = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { title: title, description: description, imgSource: imgSource },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("server error");
  }
};
module.exports = { makeNewCategory, getAllCategories, findCategory, updateCategory };
