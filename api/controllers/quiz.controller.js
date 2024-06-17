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

export const getquizzes = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const quizzes = await Quiz.find({
      ...(req.query.question && { question: req.query.question }),
      ...(req.query.option1 && { option1: req.query.option1 }),
      ...(req.query.question && { question: req.query.question }),
      ...(req.query.option1 && { option1: req.query.option1 }),
      ...(req.query.option2 && { option2: req.query.option2 }),
      ...(req.query.option4 && { option4: req.query.option4 }),
      ...(req.query.option4 && { option4: req.query.option4 }),
      ...(req.query.answer && { answer: req.query.answer }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.quizId && { _id: req.query.quizId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalQuizzes = await Quiz.countDocuments();

    res.status(200).json({
      quizzes,
      totalQuizzes,
    });
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
    await Quiz.findByIdAndDelete(req.params.quizId);
    res.status(200).json("The quiz has been deleted");
  } catch (error) {
    next(error);
  }
};
