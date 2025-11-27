const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imgSource: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Category", categorySchema);
