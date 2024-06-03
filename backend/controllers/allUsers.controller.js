import { User } from "../models/user.model.js";
import { apiErrorHandler } from "../utils/apiErrorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          filteredUsers,
          "All users are fetched successfully !!"
        )
      );
  } catch (error) {
    throw new apiErrorHandler(500, error?.message);
  }
});
