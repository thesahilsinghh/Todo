import mysql from "mysql2/promise";

// Create a connection using the promise-based interface
const connectToDb = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

try {
  console.log("Connected to the MySQL database!");

  // Create the users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `;

  // Create the tasks table foreign key "user_id" to users table's "id"
  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      priority VARCHAR(255) NOT NULL,
      due_date DATE,
      created_at DATE,
      updated_at DATE,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `;

  // Execute the queries
  await connectToDb.query(createUsersTable);
  console.log("Users table created/connected successfully!");

  await connectToDb.query(createTasksTable);
  console.log("Tasks table created/connected successfully!");
} catch (err) {
  console.error("Error:", err);
}

export default connectToDb;
