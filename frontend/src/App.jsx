import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [openTaskId, setOpenTaskId] = useState(null);

  // جلب المهام
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // إضافة مهمة
  const addTask = async () => {
    if (!title) return;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // حذف
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  // إكمال
  const toggleComplete = async (task) => {
    await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        completed: !task.completed,
      }),
    });
    fetchTasks();
  };

  // الفلاتر
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "notCompleted") return !task.completed;
    return true;
  });

  return (
    <>
      <div className="navbar">
        <div className="logo">Task Manager</div>
      </div>

      <div className="container">
        <div className="task-box">
          <h2 className="title">My Tasks</h2>

          {/* إضافة مهمة */}
          <div className="add-task">
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="description.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={addTask}>إضافة</button>
          </div>

          {/* الفلاتر */}
          <div className="filters">
            <button onClick={() => setFilter("all")}>all tasks</button>
            <button onClick={() => setFilter("completed")}>completed</button>
            <button onClick={() => setFilter("notCompleted")}>not completed</button>
          </div>

          {/* قائمة المهام */}
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <li className="task-item" key={task.id}>
                
                {/* العنوان + سهم */}
                <div className="task-main">
                  <span>{task.title}</span>

                  <button
                    className="toggle-desc"
                    onClick={() =>
                      setOpenTaskId(openTaskId === task.id ? null : task.id)
                    }
                  >
                    {openTaskId === task.id ? "▲" : "▼"}
                  </button>
                </div>

                {/* الوصف */}
                {openTaskId === task.id && (
                  <div className="description">
                    {task.description || "no description "}
                  </div>
                )}

                {/* الأزرار */}
                <div className="buttons">
                  <button
                    className="complete-btn"
                    onClick={() => toggleComplete(task)}
                  >
                    {task.completed ? " completed  " : "not completed "}
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </>
  );
}

export default App;