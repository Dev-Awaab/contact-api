import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(colors.bgCyan(`MongoDB Connected 🌎`));
  } catch (error) {
    console.error(colors.red(`Mongodb Failed to connect: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
