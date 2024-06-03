export const generateAccessandRefreshToken = async (user) => {
  try {
    // const user = await User.findById(userId); // we got the object from backend
    // console.log(user, "check user");
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // because we don't have password here

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiErrorHandler(
      500,
      "Something went wrong while generating refresh and access token "
    );
  }
};
