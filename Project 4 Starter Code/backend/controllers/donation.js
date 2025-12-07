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


module.exports = {addDonation}
