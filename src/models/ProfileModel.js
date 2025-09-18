import mongoose from "mongoose";

const { Schema } = mongoose;

const educationSchema = new Schema({
  school: {
    type: String,
    default: "",
  },
  degree: {
    type: String,
    default: "",
  },
  fieldOfStudy: {
    type: String,
    default: "",
  },
});

const workSchema = new Schema({
  company: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "",
  },
  years: {
    type: String,
    default: "",
  },
});

const profileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bio: {
    type: String,
    default: "",
  },
  skills: {
    type: [],
    default: [],
  },
  currentPost: {
    type: String,
    default: "",
  },
  pastWork: {
    type: [workSchema],
    default: [],
  },
  education: {
    type: [educationSchema],
    default: [],
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      comment: {
        type: String,
      },
      title: {
        type: String
      },
      description:{
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
