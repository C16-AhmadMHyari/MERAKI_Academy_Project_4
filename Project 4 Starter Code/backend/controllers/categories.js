const mongoose = require("mongoose");
const categoryModel = require("../models/categories");

const makeNewCategory = async (req, res) => {
  const { title, description, imgSource } = req.body;
  const newCategory = new categoryModel({
    title,
    description,
    imgSource,
  });
  try{
    const result = await newCategory.save()
    res.status(201).json({
        succes: true,
        message: "New category created",
        result: result
    })
  }catch(err){
    res.status(500).json("Server Error")
  }
};

const getAllCategories = async (req,res)=>{
    try{
        const result = await categoryModel.find({})
        console.log(result);
        
        if(result.length >0){
            res.status(200).json({
                success:true,
                result:result
            })
        }else{res.status(404).json("There is no category")}
    }catch(err){
        res.status(500).json("Server Error")
    }
}
module.exports = {makeNewCategory, getAllCategories}