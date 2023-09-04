import express from "express";
import { json } from "express";
import fs from "fs";
import https from "https";
import connectToDB from "./connect.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/courseRoutes.js";
import audioRouter from "./routes/audioRoutes.js";
import dictionaryRouter from "./routes/dictionaryRoutes.js";
import bookrouter from "./routes/bookRoutes/bookRoutes.js";
import vocaBullaryTopicRoute from "./routes/vocabullaryTopicRoutes.js";
import dialogueTopicRouter from "./routes/dialogueTopicRoutes.js";
import quizVocabularyRouter from "./routes/quizVocabularyRoutes.js";
import verbTenseRouter from "./routes/verbTenseRoutes/verbTenseRoutes.js";
import sentenceBuilderRouter from "./routes/sentenceBuilder/sentenceBuilderRoutes.js";
import grammerRouter from "./routes/grammerRoutes/grammerRoutes.js";
import conjugationRouter from "./routes/conjugationRoutes/conjugationRoutes.js";
import { upadeteAllBooks } from "./controllers/bookController/bookController.js";
import { modifyFieldName } from "./controllers/dictionaryContollers.js";
// import { updateWordsWithPartOfSpeechAndDefinition } from "./controllers/dictionaryContollers.js";
// import { updateQuizVocabularyShema } from "./controllers/quizVocabulary.js";
const app = express();
const PORT = 5500 || process.env.PORT;
// const HTTPS_PORT = process.env.HTTPS_PORT || 4334;
app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://francophoenix.netlify.app",
    credentials: true,
    // If you need to include cookies in the requests
  })
);
app.use(courseRouter);
app.use(audioRouter);
app.use(dictionaryRouter);

app.use(bookrouter);
app.use(vocaBullaryTopicRoute);
app.use(dialogueTopicRouter);
app.use(quizVocabularyRouter);
app.use(verbTenseRouter);
app.use(sentenceBuilderRouter);
app.use(grammerRouter);
app.use(conjugationRouter);
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const start = async () => {
  try {
    await connectToDB(process.env.MONGODB_URI);

    app.get("/", (req, res) => {
      res.send("Hello");
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

start();

///////////////////////////////////
// app.get("/update-books", async (req, res) => {
//   try {
//     await upadeteAllBooks(req, res);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to update books" });
//   }
// });
// ;app.get("/update-words", async (req, res) => {
//   try {
//     // Call the updateWordsWithPartOfSpeechAndDefinition controller
//     await updateQuizVocabularyShema(req, res);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update words" });
//   }
// });
// app.get("/update-field-name", async (req, res) => {
//   try {
//     // Call the updateWordsWithPartOfSpeechAndDefinition controller
//     await modifyFieldName(req, res); // Pass the req and res objects
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update name" });
//   }
// });
