import UserModel from "../models/user.model.js";
import { comparePassword, genToken, hash } from "../utils/encrypt.js";
import ProfileModel from "../models/profile.model.js";
import {
  validateUser,
  validateUserLogin,
} from "../validation/auth.validation.js";

/**
 * @desc Get all users
 * @Route GET /api/users
 * @Access Private/Admins
 */

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");

    res.status(200).json({
      success: true,
      message: "All Users Retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Get a user
 * @Route GET /api/users/:id
 * @Access Public
 */

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
      .select("-password")
      .populate("profile");
    // Also populate but takes in paths and items to select
    // .populate({ path: "profile", select: "firstName lastName" });

    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }

    const data = formatUser(user);

    res.status(200).json({
      success: true,
      message: "User Retrieved successfully",
      data,
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
 * @Route POST /api/users/register
 * @Access Public
 */

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // if (!firstName || !lastName || !email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "firstName, lastName, email and password are required",
    //   });
    // }

    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "user already exist",
      });
    }

    const hashedPassword = await hash(password);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });

    const profile = await ProfileModel.create({
      firstName,
      lastName,
      user: user._id,
    });

    user.profile = profile._id;

    await user.save();

    await user.populate("profile");

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
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
 * @desc Login a user
 * @Route POST /api/users/login
 * @Access Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validateUserLogin(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with email ${email} was not found` });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await user.populate("profile");

    const data = formatUser(user);

    const token = genToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    delete user.password;

    sendTokenResponse(token, 200, res, data);
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
    const { id } = req.user;

    let user = await UserModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with email ${email} was not found` });
    }

    const { role, ...rest } = req.body;

    if (role) {
      user.role = role;
      await user.save();
      return res.status(201).json({
        success: true,
        message: "User Updated Successfully",
        data: formatUser(user),
      });
    }

    // const profile = await ProfileModel.findById(user.profile);

    // if (!profile) {
    //   return res
    //     .status(404)
    //     .json({ message: `The profile with id ${profile._id} was not found` });
    // }

    await ProfileModel.updateOne({ user: user._id }, rest);

    user = await UserModel.findById(user.id).populate("profile");

    res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      data: formatUser(user),
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
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: `The user with id of ${id} was not found` });
    }
    res.status(201).json({
      success: true,
      message: "User Deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Helper Funcs
const sendTokenResponse = (token, statusCode, res, data) => {
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    access_token: token,
    data,
  });
};

const formatUser = (user) => {
  const { profile } = user;
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    profile: {
      _id: profile._id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      user: profile.user,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    },
  };
};
export { getUsers, getUser, registerUser, loginUser, updateUser, deleteUser };
