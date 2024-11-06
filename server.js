import express from "express";
import ContactsRoutes from "./routes/contacts.route.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import logger from "./middleware/logger.js";
import responseTimeLogger from "./middleware/responseTimeLogger.js";
import morgan from "morgan";

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
app.use(morgan("dev"));

// Routes
app.use("/api/contacts", ContactsRoutes);

// Database connection
connectDB();

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
