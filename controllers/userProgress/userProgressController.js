import UserProgress from "../../modules/User/userProgressSchema.js";
import User from "../../modules/User/userSchema.js";

export const submitExercise = async (req, res) => {
  const { verb, tense, exerciseType, percentage, userId } = req.body;
  console.log("userId", userId);
  console.log("verb", verb);
  console.log("tense", tense);
  console.log("exerciseType", exerciseType);
  console.log("percentage", percentage);

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
