import { userValidationSchema } from "../validation/userValidation.js";
import User from "../models/user.model.js";
import { generateTokenAndSaveInCookies } from "../middleware/token.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { name, email, phone, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashPassword });
    newUser.save();
    const token = generateTokenAndSaveInCookies(newUser._id, res);
    console.log("token", token);
    res.status(200).json({
      success: true,
      message: "user has registered successfully",
      newUser,
    });
  } catch (err) {
    console.log(err, "getting error in signup ");
    res.status(400).json({
      success: false,
      message: "something went wrong during signup",
      error: err.message,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "wrong password",
      });
    }

    const token = generateTokenAndSaveInCookies(user._id, res);
    console.log("token", token);
    return res.status(200).json({
      success: true,
      message: "user has logged in successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "something went wrong while loging",
    });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    return res.status(200).json({
      success: true,
      message: "user has logged out successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "something went wrong while logout",
    });
  }
};
