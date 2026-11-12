const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const  connectDB  = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/trainings", trainingRoutes);


app.get("/", (req, res) => {
  res.send("HRM Backend Running...");
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  if (!process.env.MONGO_URI?.trim()) {
    throw new Error(
      "MONGO_URI is missing. Create Backend/.env from .env.example and set your MongoDB connection string."
    );
  }

  if (!process.env.JWT_SECRET?.trim()) {
    throw new Error(
      "JWT_SECRET is missing. Add a secret value to Backend/.env before starting the server."
    );
  }

  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
