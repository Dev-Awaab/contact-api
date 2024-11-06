import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
    },
    type: {
      type: String,
      enum: ["personal", "professional"],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("contact", ContactSchema);

export default ContactModel;
