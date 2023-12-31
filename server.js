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
import dictionaryRouter from "./routes/dictionaryRoutes.js";
import bookrouter from "./routes/bookRoutes/bookRoutes.js";
import vocaBullaryTopicRoute from "./routes/vocabullaryTopicRoutes.js";
import dialogueTopicRouter from "./routes/dialogueTopicRoutes.js";
import quizVocabularyRouter from "./routes/quizVocabularyRoutes.js";
import verbTenseRouter from "./routes/verbTenseRoutes/verbTenseRoutes.js";
import sentenceBuilderRouter from "./routes/sentenceBuilder/sentenceBuilderRoutes.js";
import grammerRouter from "./routes/grammerRoutes/grammerRoutes.js";
import conjugationRouter from "./routes/conjugationRoutes/conjugationRoutes.js";
import authRouter from "./routes/auth/authRouter.js";
import { upadeteAllBooks } from "./controllers/bookController/bookController.js";
import { modifyFieldName } from "./controllers/dictionaryContollers.js";
import Grammer from "./modules/grammerSchemas/grammerShema.js";
import portfolioRouter from "./routes/portfolio/portfolioRouter.js";
import userProgressRouter from "./routes/auth/userProgressRouter.js";
import reportRouter from "./routes/reportRouter/reportRouter.js";
import vocabularyProgressRouter from "./routes/progress/vocabularyProgress.js";
import VerbTenseExercise from "./modules/verbTenseShemas/presentTenseSchema.js";
import mongoose from "mongoose";
// import { updateWordsWithPartOfSpeechAndDefinition } from "./controllers/dictionaryContollers.js";
// import { updateQuizVocabularyShema } from "./controllers/quizVocabulary.js";
const app = express();
const PORT = 5500 || process.env.PORT;
// const HTTPS_PORT = process.env.HTTPS_PORT || 4334;
app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    // origin: "https://francophoenix.netlify.app",
    origin: "http://localhost:5173",

    // origin: "https://frang.ge",
    credentials: true,
  })
);

app.use(express.json());

app.use(courseRouter);
app.use(dictionaryRouter);

app.use(bookrouter);
app.use(vocaBullaryTopicRoute);
app.use(dialogueTopicRouter);
app.use(quizVocabularyRouter);
app.use(verbTenseRouter);
app.use(sentenceBuilderRouter);
app.use(grammerRouter);
app.use(conjugationRouter);
app.use(authRouter);
app.use(portfolioRouter);
app.use(userProgressRouter);
app.use(reportRouter);
app.use(vocabularyProgressRouter);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.post("/verbes", async (req, res) => {
  try {
    // Find all documents in the collection
    const verbs = await VerbTenseExercise.find({});

    for (const verb of verbs) {
      for (const tenseKey in verb.tenses) {
        // Check if it's an array before applying map
        if (Array.isArray(verb.tenses[tenseKey])) {
          verb.tenses[tenseKey] = verb.tenses[tenseKey].map((sentence) => {
            if (!sentence._id) {
              sentence._id = new mongoose.Types.ObjectId();
            }
            return sentence;
          });
        }
      }

      // Save the updated document
      await VerbTenseExercise.updateOne(
        { _id: verb._id },
        { $set: { tenses: verb.tenses } }
      );
    }

    console.log("Successfully added _id to sentences.");
    res.status(200).send("Successfully added _id to sentences.");
  } catch (error) {
    console.error("Error adding _id to sentences:", error);
    res.status(500).send("Internal Server Error");
  }
});

const start = async () => {
  try {
    await connectToDB(process.env.MONGODB_URI);

    app.get("/", (req, res) => {
      res.send("Hello app is running...");
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
