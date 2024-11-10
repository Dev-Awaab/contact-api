import express from "express";
import ContactsRoutes from "./routes/contacts.route.js";
<<<<<<< HEAD
import UserRoutes from "./routes/user.route.js"
=======
import UsersRoutes from "./routes/user.route.js";
>>>>>>> 142b8ff543982367019ba5fc1cc3f6e932b4f724
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import responseTimeLogger from "./middleware/responseTimeLogger.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Logger Middleware
app.use(responseTimeLogger);
app.use(logger);
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/users", UsersRoutes);
app.use("/api/contacts", ContactsRoutes);

app.use("/api/users", UserRoutes);
// Database connection
connectDB();

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
