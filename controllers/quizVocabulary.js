import quizVocabulary from "../modules/quizVocabularySchema.js";

export const getQuizData = async (req, res) => {
  const { index } = req.params; // Change req.body.index to req.params
  try {
    const quizData = await quizVocabulary.findOne({ _id: index });
    console.log(quizDatagit); // Use _id for searching
    if (!quizData) {
      return res.status(404).json({ error: "Vocabulary data not found" });
    }

    res.status(200).json(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getQuizTopicNames = async (req, res) => {
  try {
    // Use distinct to get unique topic names
    const topics = await quizVocabulary.find().select("topic"); // Select only the topic field
    if (!topics) {
      return res.status(404).json({ error: "Topic names not found" });
    }

    res.status(200).json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
