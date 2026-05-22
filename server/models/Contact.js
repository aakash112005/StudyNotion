const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
    },
    countrycode: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto
  }
);

module.exports = mongoose.model("Contact", contactSchema);
