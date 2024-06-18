import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../src/utils/cn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const QuizPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`/api/quiz/getQuizzes`);
        const data = await res.json();
        if (res.ok) {
          const modifiedQuizzes = data.quizzes.map((quiz) => ({
            question: quiz.question,
            options: [quiz.option1, quiz.option2, quiz.option3, quiz.option4],
            correctAnswer:
              quiz.answer === quiz.option1
                ? 0
                : quiz.answer === quiz.option2
                ? 1
                : quiz.answer === quiz.option3
                ? 2
                : 3,
          }));
          setQuestions(modifiedQuizzes);
          setSelectedOptions(Array(modifiedQuizzes.length).fill(null));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {
      fetchQuizzes();
    }
  }, [currentUser]);

  React.useEffect(() => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const { currentQuestion, selectedOptions, score, showResults } =
        JSON.parse(savedState);
      setCurrentQuestion(currentQuestion);
      setSelectedOptions(selectedOptions);
      setScore(score);
      setShowResults(showResults);
    }
  }, [questions]);

  React.useEffect(() => {
    if (questions.length > 0) {
      const quizState = {
        currentQuestion,
        selectedOptions,
        score,
        showResults,
      };
      localStorage.setItem("quizState", JSON.stringify(quizState));
    }
  }, [currentQuestion, selectedOptions, score, showResults, questions]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          if (currentQuestion === questions.length - 1) {
            handleQuizCompletion();
          } else {
            handleNextQuestion();
          }
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, questions]);

  const handleOptionClick = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = index;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setTimeLeft(60);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    setTimeLeft(60);
  };

  const handleQuizCompletion = () => {
    let calculatedScore = 0;
    selectedOptions.forEach((option, index) => {
      if (option === questions[index].correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setSelectedOptions(Array(questions.length).fill(null));
    setScore(0);
    setTimeLeft(60);
    localStorage.removeItem("quizState");
  };

  const handleCloseQuiz = () => {
    setShowResults(false);
    localStorage.removeItem("quizState");
    setOpen(false);
    navigate("/");
  };

  if (!questions.length) {
    return (
      <div className='flex items-center justify-center min-h-screen p-4 bg-transparent'>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor='#e01cd5' />
              <stop offset='100%' stopColor='#1CB5E0' />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </div>
    );
  }

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-transparent'>
        <div className='w-full max-w-2xl p-6 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg'>
          {showResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-center'
            >
              <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-400 '>
                Quiz Completed!
              </h2>
              <p className='mt-4 text-xl text-gray-600'>
                Your Score: {score} / {questions.length}
              </p>
              <div className='mt-6 flex justify-center space-x-4'>
                <button
                  onClick={handleRetakeQuiz}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition'
                >
                  Retake Quiz
                </button>
                <button
                  onClick={handleCloseQuiz}
                  className='px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition'
                >
                  Close
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center'
              >
                <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-400'>
                  Question {currentQuestion + 1} / {questions.length}
                </h2>
                <p className='mt-4 text-xl text-black dark:text-white'>
                  {questions[currentQuestion].question}
                </p>
                <p className='mt-2 text-lg text-red-500'>
                  Time Left: {timeLeft} seconds
                </p>
              </motion.div>

              <div className='mt-6 space-y-4'>
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => handleOptionClick(index)}
                    className={cn(
                      "w-full px-4 py-2 text-left text-gray-700 bg-white border rounded-lg shadow-sm hover:bg-blue-100 transition",
                      selectedOptions[currentQuestion] === index &&
                        "bg-blue-200"
                    )}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              <div className='mt-6 flex justify-between'>
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50'
                >
                  Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleQuizCompletion}
                    disabled={selectedOptions[currentQuestion] === null}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50'
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedOptions[currentQuestion] === null}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50'
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default QuizPage;
