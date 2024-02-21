import { Router } from "express";
import User from "../models/user.model.js";
const router = new Router();

// Creating a user using : POST "/api/users"
router.post("/register", async (req, res) => {
  try {
    const user = User(req.body);
    await user.save();
    return res.send(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// logging user  : POST /api/users/login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(401).send({
        message: "Invalid email or password",
      });
    }
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
