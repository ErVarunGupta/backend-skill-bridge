import Profile from "../models/ProfileModel.js";

//  Create or Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ...data } = req.body;

    let user = await Profile.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const profile_to_update = await Profile.findOne({ userId });

    Object.assign(profile_to_update, data);

    await profile_to_update.save();

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile_to_update,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  Get Profile by userId
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await Profile.findOne({ userId }).populate(
      "userId",
      "name username email profilePicture"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all users
export const getAllUserProfile = async (req, res) => {
  try {
    const users = await Profile.find().populate(
      "userId",
      "name username email profilePicture"
    );

    if (!users) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//  Delete Profile
export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOneAndDelete({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
