import Sentence from "../modules/sentenceBuilderSchema.js";
export const getAllSentences = async (req, res) => {
  try {
    const sentences = await Sentence.find();
    if (!sentences) {
      return res.status(404).json({ error: "Sentences not found" });
    }

    res.status(200).json(sentences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
