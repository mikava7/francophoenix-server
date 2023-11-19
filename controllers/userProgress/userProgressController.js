import UserProgress from "../../modules/User/userProgressSchema.js";
import User from "../../modules/User/userSchema.js";
import quizVocabularySchema from "../../modules/quizVocabularySchema.js";
export const submitExercise = async (req, res) => {
  const { verb, tense, exerciseType, percentage, userId } = req.body;

  try {
    // Check if a progress document already exists for the user
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      // If it doesn't exist, create a new progress document
      progress = new UserProgress({ userId, verbs: [] });
    }

    // Find the verb in the progress document
    let verbIndex = progress.verbs.findIndex((v) => v.verb === verb);

    if (verbIndex === -1) {
      // If the verb doesn't exist, add it
      progress.verbs.push({ verb, tenses: [] });
      verbIndex = progress.verbs.length - 1; // Get the index of the newly added verb
    }

    // Find the tense in the verb
    const tenseIndex = progress.verbs[verbIndex].tenses.findIndex(
      (t) => t.tenseName === tense
    );

    if (tenseIndex !== -1) {
      // If the tense exists, find the specific exercise type
      const exerciseTypeIndex = progress.verbs[verbIndex].tenses[
        tenseIndex
      ].percentages.findIndex((p) => p.exerciseType === exerciseType);

      if (exerciseTypeIndex !== -1) {
        // If the exercise type exists for the tense, update the percentage
        progress.verbs[verbIndex].tenses[tenseIndex].percentages[
          exerciseTypeIndex
        ].percentage = percentage;
      } else {
        // If the exercise type doesn't exist for the tense, add it
        progress.verbs[verbIndex].tenses[tenseIndex].percentages.push({
          exerciseType: exerciseType,
          percentage: percentage,
        });
      }
    } else {
      // If the tense doesn't exist, add it along with the exercise type
      progress.verbs[verbIndex].tenses.push({
        tenseName: tense,
        percentages: [
          {
            exerciseType: exerciseType,
            percentage: percentage,
          },
        ],
      });
    }

    // Calculate the total percentage for the verb
    const totalPercentage = progress.verbs[verbIndex].tenses.reduce(
      (total, tense) => {
        return (
          total +
          tense.percentages.reduce(
            (exerciseTotal, ex) => exerciseTotal + ex.percentage,
            0
          )
        );
      },
      0
    );

    progress.verbs[verbIndex].totalPercentage = totalPercentage;

    await progress.save();

    // Update the user's progressId in the User model if necessary
    const user = await User.findByIdAndUpdate(userId, {
      progressId: progress._id,
    });

    return res.json({
      success: true,
      message: "Exercise submitted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error submitting exercise" });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);
    // Use Mongoose to query the UserProgress model
    const userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      return res
        .status(404)
        .json({ success: false, message: "User progress not found" });
    }

    // Return the user progress data
    return res.status(200).json({ success: true, userProgress });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching user progress" });
  }
};

export const trackDownloadController = async (req, res) => {
  const { userId, section, contentId } = req.body;
  // console.log("in controller", { userId, section, contentId });
  // console.log("in controller body", req.body);

  try {
    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new UserProgress({ userId, verbs: [], downloads: [] });
    }

    const downloadEntry = userProgress.downloads.find(
      (download) =>
        download.section === section && download.contentId === contentId
    );

    if (downloadEntry) {
      downloadEntry.downloadCount += 1;
    } else {
      userProgress.downloads.push({
        section,
        contentId,
        downloadDate: new Date(),
        downloadCount: 1,
      });
    }

    await userProgress.save();

    return res.json({
      success: true,
      message: "Download tracked successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error tracking download" });
  }
};

export const submitVocabularyExercise = async (req, res) => {
  const { userId, topicId, exerciseType, percentage } = req.body;
  console.log("vocabularyIndex", { exerciseType, percentage, userId, topicId });

  try {
    // Check if a progress document already exists for the user
    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      // If it doesn't exist, create a new progress document
      progress = new UserProgress({
        userId,
        verbs: [],
        vocabulary: [],
        downloads: [],
      });
    }

    // Check if the vocabulary array is defined, if not, initialize it
    if (!progress.vocabulary) {
      progress.vocabulary = [];
    }

    // Find the vocabulary index for the specified topic
    const vocabularyIndex = progress.vocabulary.findIndex(
      (v) => v.topic.toString() === topicId.toString()
    );
    console.log("vocabularyIndex", vocabularyIndex);

    if (vocabularyIndex !== -1) {
      // Check if the exercises array is defined, if not, initialize it
      if (!progress.vocabulary[vocabularyIndex].exercises) {
        progress.vocabulary[vocabularyIndex].exercises = [];
      }

      let exerciseUpdated = false;

      // Iterate over exercises to find and update the correct one
      for (
        let i = 0;
        i < progress.vocabulary[vocabularyIndex].exercises.length;
        i++
      ) {
        const exercise = progress.vocabulary[vocabularyIndex].exercises[i];

        if (exercise.exerciseType === exerciseType) {
          // If the exerciseType exists, update the percentage
          exercise.percentage = percentage;
          exerciseUpdated = true;
          break;
        }
      }

      // If the exerciseType doesn't exist, add it
      if (!exerciseUpdated) {
        progress.vocabulary[vocabularyIndex].exercises.push({
          exerciseType,
          percentage,
        });
      }

      // Calculate the total percentage for the vocabulary section for the specific topic
      const totalPercentage = progress.vocabulary[
        vocabularyIndex
      ].exercises.reduce(
        (exerciseTotal, ex) => exerciseTotal + ex.percentage,
        0
      );

      progress.vocabulary[vocabularyIndex].totalPercentage = totalPercentage;
    } else {
      // If the topic doesn't exist, add it along with the exerciseType
      const newTopic = {
        topic: topicId,
        exercises: [{ exerciseType, percentage }],
        totalPercentage: percentage,
      };

      progress.vocabulary.push(newTopic);
    }

    // Calculate the total percentage for the vocabulary section
    const totalPercentage = progress.vocabulary.reduce((total, topic) => {
      const topicTotal =
        topic.totalPercentage !== undefined ? topic.totalPercentage : 0;

      return total + topicTotal;
    }, 0);

    // progress.vocabularyTotalPercentage = totalPercentage;

    await progress.save();

    // Update the user's progressId in the User model if necessary
    const user = await User.findByIdAndUpdate(userId, {
      progressId: progress._id,
    });

    return res.json({
      success: true,
      message: "Vocabulary exercise submitted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error submitting vocabulary exercise",
    });
  }
};
