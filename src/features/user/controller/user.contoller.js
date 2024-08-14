import jwt from "jsonwebtoken";
import UserRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";
//controller calss
export default class UserController {
  //constructor
  constructor() {
    this.UserRepository = new UserRepository();
  }

  //signup
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPasscode = await bcrypt.hash(password, 11);
      let response = await this.UserRepository.signUp({
        name,
        email,
        password: hashedPasscode,
      });
      if (response === "Duplicate") {
        res.status(403).send("User exists! Please login.");
      } else {
        res.status(201).send("User created successfully!");
      }
    } catch (err) {
      console.error("Error found:", err);
      res.status(500).send("Error occurred! Please try again later.");
    }
  }

  //login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.UserRepository.getUser(email);

      if (user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          let token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          // Send token as response
          res.status(200).send(token);
        } else {
          res.status(400).send("Wrong Password!, try again");
        }
      } else {
        res.status(400).send("User Not Found");
      }
    } catch (err) {
      console.error("Error found:", err);
      res.status(500).send("Error occurred! Please try again later.");
    }
  }
}
