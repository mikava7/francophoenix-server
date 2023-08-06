import presentTenseVerb from "../../modules/verbTenseShemas/presentTenseSchema.js";

export const getPresentTenseVerbs = async (req, res) => {
  try {
    const presentTenseVerbs = await presentTenseVerb.find();
    if (!presentTenseVerbs) {
      return res.status(404).json({ message: "No verbes found" });
    }
    res.status(200).json(presentTenseVerbs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
