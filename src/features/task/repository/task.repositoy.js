import connectToDb from "../../../config/connectToMySql.js";

export default class TaskRepository {
  

  async getTasks(filters) {
    const { status, priority, due_date, title, description } = filters;
    
    let query = 'SELECT * FROM tasks WHERE 1=1';
    let cond = [];

    if (status) {
      query += ' AND status = ?';
      cond.push(status);
    }

    if (priority) {
      query += ' AND priority = ?';
      cond.push(priority);
    }

    if (due_date) {
      query += ' AND due_date = ?';
      cond.push(due_date);
    }

    if (title) {
      query += ' AND title LIKE ?';
      cond.push(`%${title}%`);
    }

    if (description) {
      query += ' AND description LIKE ?';
      cond.push(`%${description}%`);
    }

    try {
      const [rows] = await connectToDb.query(query, cond);
      return rows;
    } catch (err) {
      console.error("Error found:", err);
      throw new Error("Error in task.repository");
    }
  }

  // Add new task
  async addTask(newTask) {
    const { title, description, status, priority, due_date, created_at, updated_at, user_id } = newTask;
    const insertTask = `
      INSERT INTO tasks (title, description, status, priority, due_date, created_at, updated_at, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const [result] = await connectToDb.query(insertTask, [
        title,
        description,
        status,
        priority,
        due_date,
        created_at,
        updated_at,
        user_id,
      ]);
      return result.insertId;
    } catch (err) {
      console.error("Error found:", err);
      throw new Error("Error in task.repository");
    }
  }

  // Delete task
  async deleteTask(taskId) {
    const deleteTask = 'DELETE FROM tasks WHERE id = ?';
    try {
      const [result] = await connectToDb.query(deleteTask, [taskId]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Error found:", err);
      throw new Error("Error in task.repository");
    }
  }

  // Update task
  async updateTask(taskId, update) {
    const { title, description, status, priority, due_date, created_at, updated_at } = update;
    const updateTask = `
      UPDATE tasks
      SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, created_at = ?, updated_at = ?
      WHERE id = ?
    `;
    try {
      const [result] = await connectToDb.query(updateTask, [
        title,
        description,
        status,
        priority,
        due_date,
        created_at,
        updated_at,
        taskId
      ]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error("Error found:", err);
      throw new Error("Error in task.repository");
    }
  }
}
