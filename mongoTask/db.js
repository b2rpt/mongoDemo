const mongoose = require("mongoose");

const connectDb = async (collectionName) => {
  try {
    await mongoose.connect(`mongodb://localhost/${collectionName}`);
    console.log("connect to db successfully..");
  } catch (err) {
    console.log("failed to connect db..", err);
  }
};

module.exports = connectDb;
