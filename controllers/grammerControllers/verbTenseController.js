import Tense from "../../modules/grammerSchemas/verbeTensesSchema.js";

export const getAllTenses = async (req, res) => {
  try {
    const allTenses = await Tense.find();
    if (!allTenses || allTenses.length === 0) {
      return res.status(404).json({ message: "No data" });
    }
    res.status(200).json(allTenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTenseList = async (req, res) => {
  try {
    const allTenses = await Tense.find();
    if (!allTenses || allTenses.length === 0) {
      return res.status(404).json({ message: "No data" });
    }

    const tenseList = allTenses.map((tense) => ({
      _id: tense._id,
      tense: tense.name,
    }));

    res.status(200).json(tenseList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSelectedTense = async (req, res) => {
  const tenseId = req.params.id;

  try {
    const selectedTense = await Tense.findById(tenseId);

    if (!selectedTense) {
      return res.status(404).json({ message: "Tense not found" });
    }

    res.status(200).json(selectedTense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
