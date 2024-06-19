import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Spotlight } from "../ui/Spotlight";
import LinkPreview from "../ui/link-preview";
import { motion } from "framer-motion";

function StudentDashboardComp() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className='min-h-screen w-full dark:bg-black bg-white relative flex items-center justify-center'>
      <Spotlight
        className='-top-40 left-0 md:left-60 md:-top-20 z-10'
        fill={theme === "dark" ? "white" : "#13C6F7"}
      />
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      <div className='flex justify-center items-start h-[40rem] flex-col px-4'>
        <div className='text-black dark:text-white text-xl md:text-3xl min-w-full md:w-4xl  text-left mb-10'>
          Click on{" "}
          <LinkPreview
            url='https://media.istockphoto.com/id/1389431151/vector/software-update-or-operating-system-updating-progress-bar-installing-app-patch-upgrade-to.jpg?s=612x612&w=0&k=20&c=tmRNQRr58GKBt2-ottP8bFuHbtxReJKXoeVBOEMdOPk='
            className='font-bold bg-clip-text text-transparent text-blue-600 dark:text-blue-500 underline'
          >
            <Link to='/dashboard?tab=profile'>Profile Page</Link>
          </LinkPreview>{" "}
          and Upadate Your necessary details.
        </div>
        <div className='flex flex-col items-center justify-center p-4 '>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='w-full max-w-3xl p-8 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg'
          >
            <h1 className='text-3xl font-bold text-center text-black dark:text-white'>
              Quiz Instructions
            </h1>
            <div className='mt-6 space-y-4'>
              <p className='text-lg text-gray-800 dark:text-gray-400'>
                Welcome to the quiz! Please read the following instructions
                carefully before you begin:
              </p>
              <ul className='list-disc list-inside text-gray-800 dark:text-gray-400'>
                <li>You will have 1 minute to answer each question.</li>
                <li>
                  Your score will be calculated based on the number of correct
                  answers.
                </li>
                <li>
                  You can navigate between questions using the "Next" and
                  "Previous" buttons.
                </li>
                <li>
                  Click "Submit Quiz" after answering all questions to see your
                  results.
                </li>
              </ul>
              <p className='text-lg text-gray-800 dark:text-gray-400'>
                We wish you the best of luck! Click the "Start Quiz" button when
                you're ready to begin.
              </p>
            </div>
            <div className='mt-6 flex justify-center'>
              <button
                onClick={() => navigate("/quiz-test")}
                className='px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition'
              >
                Start Quiz
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardComp;
