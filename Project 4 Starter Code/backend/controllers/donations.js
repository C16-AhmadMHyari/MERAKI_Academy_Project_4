const donationModel = require("../models/donations");

const addDonation = async (req, res) => {
  const { user, category, package, amount } = req.body;
  const newDonation = new donationModel({
    user,
    category,
    package,
    amount,
    date: new Date(),
  });
  try {
    const result = await newDonation.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getAllDonations = async (req, res) => {
  try {
    const { category, package } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (package) {
      filter.package = package;
    }

    const donations = await donationModel
      .find(filter)
      .populate("user", "firstName lastName email")
      .populate("category", "name")
      .populate("package", "title")
      .sort({ date: -1 });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDonation, getAllDonations };
