import Grammer from "../../modules/grammerSchemas/grammerShema.js";

export const getBasicGrammerLessons = async (req, res) => {
  try {
    const grammerLessons = await Grammer.find();

    if (grammerLessons.length === 0) {
      return res.status(404).json({ message: "Grammer lessons not found" });
    }
    res.status(200).json(grammerLessons);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
