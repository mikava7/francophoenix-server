import Conjugation from "../../modules/verbs/conjugation.js";

export const getAllVerbs = async (req, res) => {
  try {
    // Find all documents and retrieve only the 'verb' field
    const allVerbs = await Conjugation.find({}, "verb");

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

    // Find the verb details in the database based on the verb
    const verbDetails = await Conjugation.findOne({ verb });

    if (!verbDetails) {
      return res.status(404).json({ message: "Verb details not found" });
    }

    res.status(200).json(verbDetails);
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
