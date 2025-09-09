import User from "../models/user.model.js";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create a new user
export const createUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  const newUser = new User({
    name,
    email,
    passwordHash: password,
    phone,
    role,
  });

  try {
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, passwordHash: password, role, phone },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
