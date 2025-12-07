const mongoose =require("mongoose")

const donationSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User" },
    category:{type:mongoose.Schema.Types.ObjectId, ref:"Category"},
    package:{type:mongoose.Schema.Types.ObjectId, ref:"Package"},
    amount:{type: Number, min:1, required:true},
    date:{type:Date,required:true}
})

module.exports = mongoose.model("Donation", donationSchema);
