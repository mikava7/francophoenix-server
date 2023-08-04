import quizVocabulary from "../modules/quizVocabularySchema.js";

export const getQuizData = async (req, res) => {
  try {
    const quizData = await quizVocabulary.find();
    if (!quizData) {
      return res.status(404).json({ error: "Vocabulary data not found" });
    }

    res.status(200).json(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
