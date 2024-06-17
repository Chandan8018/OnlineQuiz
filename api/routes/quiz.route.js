import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletequiz,
  updatequiz,
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.put("/update/:quizId", verifyToken, updatequiz);
router.delete("/delete/:quizId", verifyToken, deletequiz);

export default router;
