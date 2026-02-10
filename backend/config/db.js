const { Sequelize } = require("sequelize"); // نستورد المكتبه

const sequelize = new Sequelize({ // اوبجكت للاتصال
  dialect: "sqlite", // نوع الداتابيس
  storage: "./database.sqlite", // انشاء الداتابيس
});

module.exports = sequelize;