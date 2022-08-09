const mongoose = require("mongoose");

const connectionDB = async () => {
  const db = process.env.MONGO_URI;
  try {
    await mongoose.connect(db);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};


module.exports = connectionDB