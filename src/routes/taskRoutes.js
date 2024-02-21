import { Router } from "express";

const router = new Router();

// create task using : POST "/api/notes"
router.get("/createtask", (req, res) => {
  res.send("Weltaskcome");
});

export default router;
