const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");


// GET
router.get("/tasks", taskController.getTasks);

// POST
router.post("/tasks", taskController.createTask);

// PUT
router.put("/tasks/:id", taskController.updateTask);

// DELETE
router.delete("/tasks/:id", taskController.deleteTask);


module.exports = router;