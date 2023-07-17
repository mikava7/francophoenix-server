import Elementary from "../modules/elementarySchema.js";

export const getLesson = async (req, res) => {
  const { lessonNumber } = req.params;
  try {
    const course = await Elementary.findOne({
      lesson: parseInt(lessonNumber),
    });

    if (!course) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getDialogueForLesson = async (req, res) => {
  const { lessonNumber } = req.params;
  try {
    const course = await Elementary.findOne({
      lesson: parseInt(lessonNumber),
    });

    if (!course) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const dialogue = course.dialogue;

    if (!dialogue) {
      return res.status(404).json({ error: "Dialogue not found" });
    }

    res.status(200).json(dialogue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGrammer = async (req, res) => {
  const { lessonNumber } = req.params;

  try {
    const course = await Elementary.findOne({
      lesson: parseInt(lessonNumber),
    });
    console.log("course", course);

    if (!course) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const grammer = course.grammer;
    console.log("grammer", grammer);

    if (!grammer) {
      return res
        .status(404)
        .json({ error: "Vocabulary not found for this lesson" });
    }

    res.status(200).json(grammer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDialogueExercise = async (req, res) => {
  const { lessonNumber } = req.params;

  try {
    const course = await Elementary.findOne({
      lesson: parseInt(lessonNumber),
    });

    if (!course) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const dialogueExercise = course.dialogueExercise;

    if (!dialogueExercise) {
      return res
        .status(404)
        .json({ error: "Verb exercise not found for this lesson" });
    }

    res.status(200).json(dialogueExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSentenceBuilder = async (req, res) => {
  const { lessonNumber } = req.params;

  try {
    const course = await Elementary.findOne({
      lesson: parseInt(lessonNumber),
    });

    if (!course) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const sentenceBuilder = course.sentenceBuilder;

    if (!sentenceBuilder) {
      return res
        .status(404)
        .json({ error: "Sentence builder not found for this lesson" });
    }

    res.status(200).json(sentenceBuilder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPhrases = async (req, res) => {
  const { lessonNumber } = req.params;

  try {
    const course = await Elementary.findOne({
      lesson: parseInt(lessonNumber),
    });

    if (!course) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const phrases = course.phrases;

    if (!phrases) {
      return res
        .status(404)
        .json({ error: "Phrases not found for this lesson" });
    }

    res.status(200).json(phrases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
