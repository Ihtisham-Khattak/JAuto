const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],

  active: {
    type: Boolean,
    deault: true,
  },
});

module.exports = mongoose.model("User", userSchema);
