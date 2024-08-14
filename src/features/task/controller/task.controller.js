import TaskRepository from "../repository/task.repositoy.js";

export default class TaskController {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  // Get all tasks
  async getTasks(req, res) {
    try {
      const filter = req.query;
      let tasks = await this.taskRepository.getTasks(filter);
      res.status(200).send(tasks);
    } catch (err) {
      console.error("Error found:", err);
      res.status(500).send("Error found! Please try again later.");
    }
  }

  // Add a new task
  async addTask(req, res) {
    const { title, description, status, priority, due_date } = req.body;
    const user_id = req.payload.id;

    try {
      const newTask = {
        title,
        description,
        status,
        priority,
        due_date,
        user_id,
      };
      const taskId = await this.taskRepository.addTask(newTask);
      res.status(201).send(`Task added! ID: ${taskId}`);
    } catch (err) {
      console.error("Error found: \n" +err);
      res.status(500).send("Error found!. Please try again later.");
    }
  }

  // Update task
  async updateTask(req, res) {
    const { id, title, description, status, priority, due_date } = req.body;
    const user_id = req.payload.id;

    try {
      const updated = await this.taskRepository.updateTask(id, {
        title,
        description,
        status,
        priority,
        due_date,
        user_id,
      });
      if (updated) {
        res.status(200).send("Task updated successfully!");
      } else {
        res.status(404).send("Task not found!");
      }
    } catch (err) {
      console.error("Error found: \n" +err);
      res.status(500).send("Error found! Please try again later.");
    }
  }

  // Delete a task
  async deleteTask(req, res) {
    const { id } = req.body;

    try {
      const isDone = await this.taskRepository.deleteTask(id);
      if (isDone) {
        res.status(200).send("Task deleted successfully!");
      } else {
        res.status(404).send("Task not found!");
      }
    } catch (err) {
      console.error("Error found:", err);
      res.status(500).send("Error found! Please try again later.");
    }
  }
}
