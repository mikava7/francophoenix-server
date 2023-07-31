import dialogueTopic from "../modules/dialogueTopics.js";
export const getAllDialogueTopics = async (req, res) => {
  try {
    const dialogueTopics = await dialogueTopic.find();
    res.json(dialogueTopics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getDialogueTopicById = async (req, res) => {
  try {
    const dialogueTopic = await dialogueTopic.findById(req.params.id);
    if (!dialogueTopic) {
      return res.status(404).json({ message: "Dialogue topic not found" });
    }
    res.json(dialogueTopic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
