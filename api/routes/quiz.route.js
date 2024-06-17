import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletequiz,
  updatequiz,
  getquizzes,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.put("/update/:quizId", verifyToken, updatequiz);
router.delete("/delete/:quizId", verifyToken, deletequiz);
router.get("/getQuizzes", getquizzes);

export default router;
