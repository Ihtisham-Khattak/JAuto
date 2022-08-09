const mongoose = require("mongoose");
//AutoIncrement ID (intall mongoose-sequence) package
const autoIncrement = require('mongoose-sequence')(mongoose)


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

  activeStatus: {
    type: Boolean,
    deault: true,
  },
});


noteSchema.plugin(autoIncrement, {
    inc_number: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})
module.exports = mongoose.model("User", userSchema);
