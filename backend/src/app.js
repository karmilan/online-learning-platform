import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import courseRoutes from "./routes/courses.route.js";
import userRoutes from "./routes/users.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ msg: "success" });
});

// CRUD functionalities
app.use("/api/v1", courseRoutes);
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`The server is running at PORT:${PORT}`);
});
