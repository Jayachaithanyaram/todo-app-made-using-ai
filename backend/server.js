const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const todoRoutes = require("./routes/todoroutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
