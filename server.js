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
app.use(conjugationRouter);
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
//

// HTTPS Configuration with Self-Signed Certificates
// const privateKey = fs.readFileSync("path/to/private-key.pem", "utf8");
// const certificate = fs.readFileSync("path/to/certificate.pem", "utf8");

// const credentials = { key: privateKey, cert: certificate };
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(HTTPS_PORT, () => {
//   console.log(`HTTPS server is listening on port ${HTTPS_PORT}`);
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
