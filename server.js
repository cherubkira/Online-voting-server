// import "express-async-errors";
// import * as dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import morgan from "morgan";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cloudinary from "cloudinary";
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import cors from "cors";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // middleware
// import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// const app = express();

// // routes
// import adminRouter from "./routes/adminRouter.js";
// import studentRouter from "./routes/studentRouter.js";
// import candidateRouter from "./routes/candidateRouter.js";
// import logoutRouter from "./routes/logoutRouter.js";
// import userRouter from "./routes/userRouter.js";

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use(helmet());
// app.use(mongoSanitize());

// app.use("/api/admin", adminRouter);
// app.use("/api/student", studentRouter);
// app.use("/api/candidate", candidateRouter);
// app.use("/api/user", userRouter);
// app.use("/api/logout", logoutRouter);

// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test " });
// });

// app.use("*", (req, res) => {
//   res.status(404).json({ msg: "not found" });
// });

// app.use(errorHandlerMiddleware);

// const port = process.env.PORT || 5100;
// try {
//   await mongoose.connect(process.env.MONGO_URL);
//   app.listen(port, () => {
//     console.log(`server running on PORT ${port}....`);
//   });
// } catch (error) {
//   console.log(error);
//   process.exit(1);
// }

import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();

// Routes
import adminRouter from "./routes/adminRouter.js";
import studentRouter from "./routes/studentRouter.js";
import candidateRouter from "./routes/candidateRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import userRouter from "./routes/userRouter.js";

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);
app.use("/api/candidate", candidateRouter);
app.use("/api/user", userRouter);
app.use("/api/logout", logoutRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test" });
});

// 404 Error handling
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Custom error handler
app.use(errorHandlerMiddleware);

// Server & DB connection
const port = process.env.PORT || 5100;
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("MONGO_URL not defined in the environment variables.");
  process.exit(1); // Exit if MONGO_URL is missing
}

try {
  await mongoose.connect(mongoUrl);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
