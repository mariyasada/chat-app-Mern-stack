import { User } from "../models/user.model.js";
import { apiErrorHandler } from "../utils/apiErrorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessandRefreshToken } from "../utils/generateAccessAndRefreshToken.js";
import bcryptjs from "bcryptjs";

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, username, email, password, gender, confirmPassword } =
      req.body;

    console.log(password, confirmPassword, "both password");

    if (
      fullName === "" ||
      username === "" ||
      password === "" ||
      email === "" ||
      gender === "" ||
      confirmPassword === ""
    ) {
      throw new apiErrorHandler(
        400,
        " All the fields required for user registration"
      );
    }
    if (!email.includes("@")) {
      throw new apiErrorHandler(
        400,
        "please check your email properly,It must include @"
      );
    }
    if (password.length <= 6 || password.length >= 12) {
      throw new apiErrorHandler(
        400,
        "Password length must be between 6 to 12 characters"
      );
    }
    if (password !== confirmPassword) {
      throw new apiErrorHandler(
        400,
        "Password and confirmPassword are not matching"
      );
    }
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
      throw new apiErrorHandler(
        400,
        "User already exists with the same username or email"
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10); // adding some random string into password ex:abc salt:123 password:abc123
    const hashedPassword = await bcryptjs.hash(password, salt);

    // set profile pic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const otherProfilePic = `https://avatar.iran.liara.run/public/boy`;

    const profilePic =
      gender === "Male"
        ? boyProfilePic
        : gender === "Female"
        ? girlProfilePic
        : otherProfilePic;

    // create a user in database
    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      email,
      profilePic,
    });

    const createdUser = await User.findById(newUser?._id).select("-password");
    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      newUser
    );
    if (!newUser) {
      throw new apiErrorHandler(
        500,
        "Something went wrong while registering user"
      );
    }
    if (!createdUser) {
      throw new apiErrorHandler(
        500,
        "User was created but could not be retrieved"
      );
    }
    const options = { httpOnly: true, secure: true };
    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new apiResponse(200, createdUser, "user successfully registered"));
  } catch (error) {
    throw new apiErrorHandler(500, error?.message);
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiErrorHandler(404, "User doesn't exist in database");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new apiErrorHandler(400, "Invalid password");
    }

    const loggedInUser = await User.findOne({ email }).select("-password");
    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user
    );

    const options = { httpOnly: true, secure: true };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new apiResponse(
          200,
          { user: loggedInUser, accessToken },
          "user successfully loggedin"
        )
      );
  } catch (err) {
    next(err);
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: undefined },
      },
      { new: true }
    ); // req.user kaha se aaya? we are seeting user object in request via middleware
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new apiResponse(200, {}, "User loggedout successfully"));
  } catch (err) {
    throw new apiErrorHandler(500, err?.message);
  }
});
