const packageModel = require("../models/packages");

const createNewPackage = async (req, res) => {
  const { title, description, imgSource, urgent, Active, category } = req.body;
  const newPackage = new packageModel({
    title,
    description,
    imgSource,
    urgent,
    Active,
    category,
  });
  try {
    const result = await newPackage.save();
    res.status(201).json({
      success: true,
      message: "New Package created",
      result: result,
    });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

const getAllPackages = async (req, res) => {
  try {
    const result = await packageModel.find({});
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        result: result,
      });
    } else {
      res.status(200).json("There is no packages");
    }
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

// const updatePackagesByID = async(req,res)=>{
//   const {id} = req.params
//   try{
//     const result = await packageModel.updateMany({category:`${id}`},{ $set: { category: `69341920ba38d2fd6b8c623b` } })
//     res.status(200).json(result)
//   }catch(err){console.log(err);
//   }

// }

const deletePackage = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await packageModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Selected Package Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const changeActivity = async (req, res) => {
  const { id } = req.params;
  const { Active } = req.body;
  try {
    const result = await packageModel.findByIdAndUpdate(id, { Active });
    res.status(200).json({
      success: true,
      message: "Package activity changed",
    });
  } catch (err) {
    res.status(500).json("server error");
  }
};
module.exports = {
  createNewPackage,
  getAllPackages,
  deletePackage,
  changeActivity,
  // updatePackagesByID
};
