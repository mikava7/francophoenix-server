import VerbTenseExercise from "../../modules/verbTenseShemas/presentTenseSchema.js";

export const getPresentTenseVerbs = async (req, res) => {
  try {
    const presentTenseVerbs = await VerbTenseExercise.find({});
    if (!presentTenseVerbs) {
      return res.status(404).json({ message: "No verbes found" });
    }
    if (presentTenseVerbs.length === 0) {
      return res.status(404).json({ message: "No verbes found" });
    }

    res.status(200).json({ presentTenseVerbs });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getVerbExercise = async (req, res) => {
  const { id } = req.params;
  // console.log("id", id);

  try {
    const verbTenses = await VerbTenseExercise.findById(id);
    if (!verbTenses) {
      // Handle the case where no exercises were found
      return res
        .status(404)
        .json({ message: "No exercises found for the specified verb." });
    }

    // If exercises were found, return them
    return res.status(200).json(verbTenses);
  } catch (error) {
    // Handle any potential errors
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVerbList = async (req, res) => {
  try {
    // Find all documents and retrieve only the 'verb' field
    const allVerbs = await VerbTenseExercise.find({}, "verb  _id");

    if (!allVerbs) {
      return res.status(404).json({ message: "Verbs not found" });
    }
    res.status(200).json(allVerbs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch verbs" });
  }
};

export const getExerciseByTense = async (req, res) => {
  const { selectedTense, sentencesLength, selectedVerbs } = req.body;

  try {
    const exercises = await VerbTenseExercise.aggregate([
      {
        $match: {
          verb: { $in: selectedVerbs },
          [`tenses.${selectedTense}`]: { $exists: true, $not: { $size: 0 } },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          sentences: {
            $map: {
              input: {
                $slice: [`$tenses.${selectedTense}`, sentencesLength], // Select only the desired number of sentences
              },
              as: "tense",
              in: {
                sentence: "$$tense.sentence",
                words: "$$tense.words",
                correctAnswer: "$$tense.correctAnswer",
                _id: 1,
              },
            },
          },
        },
      },
    ]);

    res.json({ exercises });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
