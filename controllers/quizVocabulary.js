import quizVocabulary from "../modules/quizVocabularySchema.js";

export const getQuizData = async (req, res) => {
  const { index } = req.params;
  try {
    const quizData = await quizVocabulary.findOne({ _id: index });

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
    const topicNamesWithInfo = await quizVocabulary.aggregate([
      {
        $project: {
          _id: 1,
          topic: 1,
          wordsCount: { $size: "$words" }, // Calculate the size of the words array
          imageUrl: 1,
        },
      },
    ]);

    if (!topicNamesWithInfo) {
      return res.status(404).json({ error: "Topic names not found" });
    }

    res.status(200).json(topicNamesWithInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateQuizVocabularyShema = async (req, res) => {
  try {
    const topics = await quizVocabulary.find();

    // Create an array to store the bulk write operations
    const bulkOperations = topics.map((topic) => ({
      updateOne: {
        filter: { _id: topic._id },
        update: {
          $set: {
            imageUrl: "",
            text: "",
            exercises: [],
          },
        },
      },
    }));

    // Perform the bulk write operation
    await quizVocabulary.bulkWrite(bulkOperations);

    console.log("Successfully updated words with synonym and antonym.");
    res.json({ message: "Words updated successfully." });
  } catch (error) {
    console.error("Error updating words:", err);
    res.status(500).json({ error: "Failed to update words" });
  }
};
