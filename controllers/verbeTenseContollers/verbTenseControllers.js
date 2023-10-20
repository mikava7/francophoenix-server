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
  console.log("id", id);
  try {
    const verbTenses = await VerbTenseExercise.findById(id); // Assuming you want to find exercises for a specific verb

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
