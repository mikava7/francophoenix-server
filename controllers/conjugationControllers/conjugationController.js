import Conjugation from "../../modules/verbs/conjugation.js";
import VerbTenseExercise from "../../modules/verbTenseShemas/presentTenseSchema.js";
export const getAllVerbs = async (req, res) => {
  try {
    // Find all documents and retrieve only the 'verb' field
    const allVerbs = await Conjugation.find({}, "verb primary verbGroup");

    if (!allVerbs) {
      return res.status(404).json({ message: "Verbs not found" });
    }
    res.status(200).json(allVerbs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch verbs" });
  }
};

export const getVerbDetails = async (req, res) => {
  try {
    const { verb } = req.params; // Get the verb from the request parameters

    // Find the verb details in the database based on the verb and populate the exercise field
    const verbDetails = await Conjugation.findOne({ verb }).populate(
      "exercise"
    );
    let verbExercise = await VerbTenseExercise.findOne({ verb });

    if (!verbExercise) {
      verbExercise = "Exercise will be added soon";
    }

    if (!verbDetails) {
      return res.status(404).json({ message: "Verb details not found" });
    }

    let verbWithExercise;

    if (typeof verbExercise === "object") {
      // Combine the two objects into one
      verbWithExercise = {
        ...verbDetails.toObject(),
        exercise: verbExercise.toObject(),
      };
    } else {
      verbWithExercise = {
        ...verbDetails.toObject(),
        exercise: verbExercise,
      };
    }

    // Send the combined object as the response
    return res.status(200).json(verbWithExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSelectedVerbsDetails = async (req, res) => {
  try {
    const { verbs } = req.params; // Get the verbs from the request parameters

    const verbsArray = verbs.split(",");

    // Find the verb details in the database based on the array of verbs
    const verbDetails = await Conjugation.find({ verb: { $in: verbsArray } });

    if (!verbDetails || verbDetails.length === 0) {
      return res.status(404).json({ message: "Verb details not found" });
    }

    res.status(200).json(verbDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
