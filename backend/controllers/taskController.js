const Task = require("../models/taskModel");


// جلب كل المهام
exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};


// إضافة مهمة جديدة
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    completed: false,
  });

  res.json(task);
};


// تعديل مهمة
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  await Task.update(
    { title, description, completed },
    { where: { id } }
  );

  res.json({ message: "Task updated" });
};


// حذف مهمة
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  await Task.destroy({ where: { id } });

  res.json({ message: "Task deleted" });
};