import UserModel from "../models/user.model.js";

/**
 * @desc Get all users
 * @Route GET /api/users
 * @Access Public
 */

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json({
      success: true,
      message: "Retrived",
      data: users,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * @desc Get a user
 * @Route GET /api/users/:id
 * @Access Public
 */

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }

    res.status(200).json({
      success: true,
      message: "Retrived",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Create a user
 * @Route POST /api/users
 * @Access Public
 */

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists ){
        res.status(400).json({
            message:"The user already exist"
        })
    }

    if (!firstName ||!lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "firstName or lastName or email or password are required",
      });
    }
    const user = await UserModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Update a user
 * @Route PUT /api/users/:id
 * @Access Public
 */

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      message: "Updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Delete a user
 * @Route DELETE /api/users/:id
 * @Access Public
 */

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }

    await UserModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Deleted",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { getUsers, getUser, createUser, updateUser, deleteUser };
