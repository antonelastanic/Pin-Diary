const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        required: true,
        min: 3,
      },
    desc: {
        type: String,
        required: true,
      },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    lat:{
        type: Number,
        required: true,
      },
    long: {
        type: Number,
        required: true,
      },
    imgURL: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pin", PinSchema);