import vocabularyTopicsSchema from "../modules/vocabularyTopics.js";
export const getVocabularyTopics = async (req, res) => {
  try {
    const vocabularyTopics = await vocabularyTopicsSchema.find();

    if (!vocabularyTopics) {
      return res.status(404).json({ error: "Vocabulary Topics not found" });
    }

    res.status(200).json(vocabularyTopics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
