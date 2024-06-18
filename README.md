# OnlineQuiz Assignment

Welcome to the OnlineQuiz Assignment project! This project is designed to showcase a web application built with modern technologies including React, Redux, Tailwind CSS, and more. The application features user authentication, a private route system, and a beautiful, responsive design.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure login and registration with Node JS and Redux state management.
- **Private Routes**: Protected routes that are accessible only to authenticated users.
- **Responsive Design**: Mobile-first design using Tailwind CSS.
- **Interactive UI**: Smooth animations using Framer Motion.
- **Reusable Components**: Modular and reusable React components.

## Demo

![Home Page](./frontend/public/homepage.png)
---
![Sign Up](./frontend/public/signup.png)
---
![Sign In](./frontend/public/signin.png)
---
![Update Profile](./frontend/public/updateProfile.png)
---
![SideBar](./frontend/public/sidebar.png)
---
![All Quizzes](./frontend/public/viewquiz.png)
---
![Delete Quizzes](./frontend/public/deletequiz.png)
---
![Update Quiz](./frontend/public/updatequiz.png)
---
![add Quiz](./frontend/public/createquiz.png)
---
![Quiz Instructions](./frontend/public/quizinstr.png)
---
![Quiz](./frontend/public/quiz.png)
---
![Complete Quiz](./frontend/public/quizcomplete.png)
---



## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/chaintechassignment.git
    cd chaintechassignment
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the development server**:
    ```sh
    npm run dev
    ```

## Usage

Once the server is running, you can visit the application at `http://localhost:7970`. You can navigate through different pages such as Home, Services, About, Contact, Sign In, and Sign Up. Authenticated users can access the Dashboard.

### Home Page

The Home Page is designed to welcome users with an attractive gradient background and interactive elements. It includes links to services and contact pages.

### Sign In / Sign Up

Users can sign in or register for a new account. These forms handle user input and manage state using Redux.

### Dashboard

Accessible only to authenticated users, the Dashboard displays user-specific information and actions.

## Folder Structure

```sh
.
├── api
|   ├── controllers
|   |   ├── auth.controller.js
|   |   ├── quiz.controller.js
|   |   └── user.controller.js 
|   ├── routes
|   |   ├── auth.route.js
|   |   ├── quiz.route.js
|   |   └── user.route.js
|   ├── models
|   |   ├── quiz.model.js
|   |   └── use.model.js
|   ├── utils
|   |   ├── error.js
|   |   └── verifyUser.js
|   └── index.js
|   
├── frontend
|   ├── public
|   ├── src
│   |   ├── components
│   │   |   ├── footer
│   │   │   |   └── FooterComp.jsx
│   │   |   ├── header
│   │   │   |   └── Header.jsx
│   │   |   ├── privateroute
│   │   │   |   └── PrivateRoute.jsx
│   │   |   ├── adminprivateroute
│   │   │   |   └── OnlyAdminPrivateRoute.jsx
│   │   |   ├── googleConfig
│   │   │   |   └── OAuth.jsx
│   │   |   ├── dash
│   │   │   |   ├── DashboardComp.jsx
|   |   |   |   ├── Profile.jsx  
|   |   |   |   ├── SideBarComp.jsx  
|   |   |   |   ├── SidebarIcons.jsx  
|   |   |   |   └── StudentDashboardComp.jsx  
│   │   |   ├── theme
│   │   │   |   └── ThemeProvider.jsx
│   │   |   ├── ui
│   │   │   |   └── Various UI Components
│   |   ├── pages
│   │   |   ├── About.jsx
│   │   |   ├── Contact.jsx
│   │   |   ├── Dashboard.jsx
│   │   |   ├── Home.jsx
│   │   |   ├── Service.jsx
│   │   |   ├── SignIn.jsx
│   │   |   ├── QuizPage.jsx
│   │   |   ├── UpdateQuiz.jsx
│   │   |   ├── PostQuiz.jsx
│   │   |   ├── ViewQuiz.jsx
│   │   |   └── SignUp.jsx
│   |   ├── redux
│   │   |   ├── theme
│   │   |   │   └── themeSlice.js
│   │   |   └── user
│   │   |       └── userSlice.js
│   |   ├── .env
│   |   ├── App.jsx
│   |   ├── main.jsx
│   |   ├── firebase.js
│   |   └── index.css
|   ├── .eslintrc.js
|   ├── .gitignore
|   ├── index.html
|   ├── package-lock.json
|   ├── package.json
|   ├── postcss.config.js
|   ├── tailwind.config.js
|   └── vite.config.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md