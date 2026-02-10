const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ربط الروابط
app.use("/", taskRoutes);


// تشغيل قاعدة البيانات ثم السيرفر
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});