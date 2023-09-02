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

export const getGrammarTopicsByAspect = async (req, res) => {
  const aspect = req.params.aspect; // Get the aspect from the request params

  try {
    const grammarTopics = await Grammer.find({ grammarAspect: aspect });

    if (grammarTopics.length === 0) {
      return res
        .status(404)
        .json({ message: `Grammar topics for aspect ${aspect} not found` });
    }

    res.status(200).json(grammarTopics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getGrammarLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const grammarLesson = await Grammer.findById({ _id: id });

    if (!grammarLesson && grammarLesson.length === 0) {
      return res
        .status(404)
        .json({ message: `Grammar lesson for aspect ${aspect} not found` });
    }

    res.status(200).json(grammarLesson);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getGrammarAspectList = async (req, res) => {
  try {
    const aspects = await Grammer.find({}, "grammarAspect");

    if (!aspects || aspects.length === 0) {
      return res.status(404).json({ message: "No aspects were found" });
    }

    const uniqueAspects = aspects.filter(
      (aspect, index, self) =>
        index ===
        self.findIndex((a) => a.grammarAspect === aspect.grammarAspect)
    );

    res.status(200).json(uniqueAspects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
