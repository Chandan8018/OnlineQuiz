import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import userRouters from "./routes/user.route.js";
import authRouters from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = 7970;
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected..");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server running on port number ${port}`);
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blackcoffer Assignment API",
      version: "1.0.0",
      description: "MERN stack Blackcoffer API",
      contact: {
        name: "Chandan Kumar Sahoo",
        email: "chandankumarsahoo@gmail.com",
        url: "https://github.com/Chandan8018",
      },
    },
    servers: [
      {
        url: "https://localhost:7970",
      },
    ],
  },

  apis: ["./api/routes/*.js"],
};

const specification = swaggerJSDoc(options);

app.use("/api/user", userRouters);
app.use("/api/auth", authRouters);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specification));

//Error-Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
