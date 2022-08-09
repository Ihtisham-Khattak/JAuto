const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },

    text: {
      type: String,
      default: true,
    },

    completed: {
      type: Boolean,
      deault: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
