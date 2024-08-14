import connectToDb from "../../../config/connectToMySql.js";
class UserRepository {
  async signUp(newUser) {
    const { name, email, password } = newUser;
    const insertUserQuery = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;

    try {
      const [result] = await connectToDb.query(insertUserQuery, [
        name,
        email,
        password,
      ]);
      return false;
    } catch (err) {
      if (err.message.substring(0, 9) == "Duplicate") {
        return err.message.substring(0, 9);
      } else {
        console.error("Error inserting user: \n" + err);
        throw new Error("Failed to insert user");
      }
    }
  }

  async getUser(email) {
    const getUserQuery = `
      SELECT * FROM users WHERE email = ?
    `;

    try {
      const [rows] = await connectToDb.query(getUserQuery, [email]);
      return rows[0];
    } catch (err) {
      console.error("Error fetching user: \n" + err);
      throw new Error("Failed to fetch user");
    }
  }
}

export default UserRepository;
