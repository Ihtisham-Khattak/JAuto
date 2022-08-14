const User = require("../Models/User");
const Note = require("../Models/Note")
//If synchronous code throws an error, then Express will catch and process it.
const asyncHandler = require("express-async-handler");
//Password encryption
const bcrpyt = require("bcrypt");

// @Desc Get all User
// @routes Get/users
// @access Private

const getAllUser = asyncHandler(async (req, res) => {
  //Select() method is used to return only userName nor password.
  //Mongoose return all the data. (all method)
  //Lean() method is used get useable  data in JSON format
  const users = await User.find().select('-password').lean()

  if (!users?.length) {
      return res.status(400).json({ message: "No User Found" })
  }
  res.json(users)
});

// @Desc Create new Uers
// @routes Post User
// @access Private

const creatNewUser = asyncHandler(async (req, res) => {
  const { userName, password, roles } = req.body;

  if (!userName || !password || !Array.isArray(roles) || !roles.islength()) {
    res.status(400).json({ message: "All fileds are required" });
  }

  //Duplicate user
  const duplicate = await Users.findOne({ userName }).lean().exec();
  if (duplicate) {
    return res.status(400).json({ message: "Duplicate Username" });
  }

  //Hash Password
  const hashedPwd = await bcrpyt.hash(password, 10); //Salt round

  //User Object
  const userObject = { userName, Password: hashedPwd, roles };

  //const
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${userName} is registered` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @Desc Update Users
// @route Patch Users
// access Private

const updateNewUser = asyncHandler(async (req, res) => {
  const { id, userName, password, roles, active } = req.body;

  if (
    !id ||
    !userName ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //duplicate
  const duplicate = await User.findOne({ userName }).lean().exec();
  //Update the original User
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(400).json({ message: "Duplicate Username" });
  }

  //Updating user object by using the received data
  user.userName = userName;
  user.roles = roles;
  user.active = active;

  //password ? user.password.bcrypt.hash(password, 10) : 'duplicate'

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.userName} updated` });
});

// @Desc Delete Users
// @routes delete Users
// @access Private

const deleteNewUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User id required" });
  }

  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    return res.status(400).json({ message: "User has assigned the notes " });
  }

  const user = await User.findById({ id }).lean().exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //Query for deleting()
  const deletedUser = await user.deleteOne();
  const reply = `${deletedUser.userName} and with ${deletedUser._id} os deleted`;
  res.json(reply);
});

module.exports = {
  getAllUser,
  creatNewUser,
  updateNewUser,
  deleteNewUser,
};
