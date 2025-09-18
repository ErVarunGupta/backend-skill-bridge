import mongoose from "mongoose";
const { Schema } = mongoose;

const HelpRequestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed"],
      default: "pending",
    },
    helperId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    ackStatus: {
      type: String,
      enum: ["waiting", "accepted", "declined"],
      default: "waiting",
    },
    scheduledTime: {
      Date: {
        type: String
      },
      Time: {
        type: String
      }
    },
  },
  { timestamps: true } 
);

const HelpRequest = mongoose.model("HelpRequest", HelpRequestSchema);

export default HelpRequest;
