import { Router } from "express";
import fetchuser from "../middlewares/fetchuser.js";
import { Task } from "../models/task.model.js";

import { body, validationResult } from "express-validator";
const router = new Router();

// ROute 1 :----> get all task using : POST "/api/notes"
router.get("/fetchtask", fetchuser, async (req, res) => {
  const task = await Task.find({ user: req.user.id });
  res.send(task);
});

// ROute 2   :----> create task using : POST "/api/notes"
router.post(
  "/createtask",
  fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const task = new Task({
        title,
        description,
        user: req.user.id,
      });

      const savedtask = await task.save();
      res.send(savedtask);
    } catch (error) {
      return res.send(400).json({ error: error.message });
    }
  }
);

// ROute 3   :----> update task using : POST "/api/notes"
router.put("/updatetask/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newtask = {};
    if (title) {
      newtask.title = title;
    }
    if (description) {
      newtask.description = description;
    }
    if (status) {
      newtask.status = status;
    }
    // find the task to be uodate
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newtask },
      {
        new: true,
      }
    );
    console.log(task);
    res.status(200).send(task);
  } catch (error) {
    return res.sendStatus(400).json({ error: error.message });
  }
});

// ROute 4   :----> delete task using : POST "/api/notes"
router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    // find the task to be uodate
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    task = await Task.findByIdAndDelete(req.params.id);
    console.log(task);
    res.status(200).send({ "success ": "task successfully deleted" });
  } catch (error) {
    return res.sendStatus(400).json({ error: error.message });
  }
});
export default router;
