import Quiz from "../models/quiz.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  console.log(req.user.isAdmin);
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a quiz"));
  }
  if (
    !req.body.question ||
    !req.body.option1 ||
    !req.body.option2 ||
    !req.body.option3 ||
    !req.body.option4 ||
    !req.body.answer
  ) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.question
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newQuiz = new Quiz({
    ...req.body,
    slug,
  });
  try {
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    next(error);
  }
};

export const updatequiz = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.quizId,
      {
        $set: {
          question: req.body.question,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          answer: req.body.answer,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedQuiz);
  } catch (error) {
    next(error);
  }
};

export const deletequiz = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete this quiz"));
  }
  try {
    await Quiz.findByIdAndDelete(req.params.postId);
    res.status(200).json("The quiz has been deleted");
  } catch (error) {
    next(error);
  }
};
