const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  decription: { type: String, required: true },
  imgSource: { type: String, required: true, unique: true },
  urgent: {type:Boolean, required:true},
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Package", packageSchema);
