import Profile from "../models/ProfileModel.js";

//  Update Rating
export const updateRating = async (req, res) => {
  try {
    const { helperId } = req.params;
    const { rating, comment } = req.body;

    // console.log(helperId);

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const profile = await Profile.findOne({userId: helperId});
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const newTotalReviews = profile.totalReviews + 1;
    let newAverageRating = 0;
    if(newTotalReviews > 0){
      newAverageRating = (profile.averageRating * profile.totalReviews + rating) / newTotalReviews;
    }

    console.log(newAverageRating);

    if (isNaN(newAverageRating)) {
      newAverageRating = 0;
    }

    profile.averageRating = newAverageRating;
    profile.totalReviews = newTotalReviews;
    profile.comments.push(comment);

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
