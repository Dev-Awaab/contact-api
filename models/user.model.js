import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar_Url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

UserSchema.pre("save", async function (next){
    if (!this. isModified("password")) return next();
    try 
    {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch(error){
      next(error);
    } 
  });



export default UserModel;
