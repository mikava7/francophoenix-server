import express from "express";
import { json } from "express";
import connectToDB from "./connect.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/courseRoutes.js";
import audioRouter from "./routes/audioRoutes.js";
import dictionaryRouter from "./routes/dictionaryRoutes.js";
import bookrouter from "./routes/bookRoutes.js";
import vocaBullaryTopicRoute from "./routes/vocabullaryTopicRoutes.js";
import dialogueTopicRouter from "./routes/dialogueTopicRoutes.js";
import quizVocabularyRouter from "./routes/quizVocabularyRoutes.js";
import verbTenseRouter from "./routes/verbTenseRoutes/verbTenseRoutes.js";
import sentenceBuilderRouter from "./routes/sentenceBuilder/sentenceBuilderRoutes.js";
import grammerRouter from "./routes/grammerRoutes/grammerRoutes.js";
// import { updateWordsWithPartOfSpeechAndDefinition } from "./controllers/dictionaryContollers.js";
const app = express();
const PORT = 5500 || process.env.PORT;
app.use(cors());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
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

// app.get("/update-words", async (req, res) => {
//   try {
//     // Call the updateWordsWithPartOfSpeechAndDefinition controller
//     await updateWordsWithPartOfSpeechAndDefinition(req, res);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update words" });
//   }
// });

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
