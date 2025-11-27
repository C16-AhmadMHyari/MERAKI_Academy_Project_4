const mongoose = require("mongoose")

const packageSchema = new mongoose.Schema({
    title:{type:String,required:true},
    decription:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId, ref:"Category"}
})

module.exports = mongoose.model("Package", packageSchema)