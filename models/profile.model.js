import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    avatar_Url: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProfileModel = mongoose.model("profile", ProfileSchema);

export default ProfileModel;
