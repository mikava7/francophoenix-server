import express from "express";
import Dictionary from "../modules/dictionarySchema.js";

export const getAllWords = async (req, res) => {
  try {
    const words = await Dictionary.find();
    const cleanWords = words.map((word) => {
      // Remove common patterns from the end of the French word using regex
      const cleanedFrench = word.french.replace(
        /\s+\(le\)$|\s+\(la\)$|\s+\(un\)$|\s+\(ils\)$|\s+\(une\)$|\s+\(se\)$|\s+\(les\)$|\s+\(en\)$|\s+\(d'\)$|\s+\(il est\)$|\s+\(c'\)$|\s+\(il s'\)$|\s+\(f\.\)$|\s+\(m\.\)$|\s+\(f\.\ pl\.\)$/i,
        ""
      );
      return { ...word._doc, french: cleanedFrench };
    });
    const quantity = cleanWords.length;

    res.json(cleanWords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch words" });
  }
};
export const checkForDuplicates = async (req, res) => {
  try {
    const duplicates = await Dictionary.aggregate([
      {
        $group: {
          _id: { french: "$french", georgian: "$georgian" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 }, // Find groups with more than one word (duplicates)
        },
      },
    ]);

    if (duplicates.length === 0) {
      return res.json({ message: "No duplicate words found." });
    }
    const quantity = duplicates.length;
    res.json({ message: "Duplicate words found:", quantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check for duplicates." });
  }
};

export const removeDuplicateWords = async (req, res) => {
  try {
    // Use MongoDB's aggregation pipeline to identify duplicates
    const duplicates = await Dictionary.aggregate([
      {
        $group: {
          _id: { french: "$french", georgian: "$georgian" },
          count: { $sum: 1 },
          ids: { $push: "$_id" }, // Keep track of IDs for duplicates
        },
      },
      {
        $match: {
          count: { $gt: 1 }, // Filter groups with count greater than 1 (i.e., duplicates)
        },
      },
    ]);

    if (duplicates.length === 0) {
      return res.status(404).json({ message: "No duplicate words found" });
    }

    // Iterate over duplicates and remove all but one of each duplicate group
    const removedIds = [];
    for (const duplicate of duplicates) {
      // Keep the first ID in the group and remove the rest
      const [keepId, ...removeIds] = duplicate.ids;
      await Dictionary.deleteMany({ _id: { $in: removeIds } });
      removedIds.push(...removeIds);
    }

    res.json({
      message: "Duplicate words removed successfully",
      quantity: removedIds.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove duplicates" });
  }
};

export const getAllVerbs = async (req, res) => {
  try {
    // Use the correct query to find words with part_of_speech "v" or "v."
    const verbs = await Dictionary.find({
      part_of_speech: { $in: ["v", "v."] },
    });

    if (!verbs || verbs.length === 0) {
      res.status(400).json({ message: "No verbs found" });
    }
    const quantity = verbs.length;
    res.status(200).json(quantity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch verbs" });
  }
};

// Controller to fetch words by their French translation (partial match) and sort them as required
export const getWordsByLanguage = async (req, res) => {
  const { language, query } = req.params;
  // console.log(language, query);
  try {
    const regex = new RegExp(query, "i"); // Case-insensitive partial match regex
    const words = await Dictionary.find({
      [language]: { $regex: regex },
    });

    // Sort the results based on exact match first and then by length (longest to shortest)
    words.sort((a, b) => {
      const aIsExactMatch = a[language].toLowerCase() === query.toLowerCase();
      const bIsExactMatch = b[language].toLowerCase() === query.toLowerCase();
      if (aIsExactMatch && !bIsExactMatch) return -1;
      if (!aIsExactMatch && bIsExactMatch) return 1;
      return a[language].length - b[language].length;
    });

    if (words.length === 0) {
      return res.status(404).json({ error: "Words not found" });
    }

    res.json(words);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch words" });
  }
};

// Controller to fetch a single word and its translations (English and Georgian) by English or Georgian translation
export async function getWordByEnglishOrGeorgian(req, res) {
  const { translation } = req.params;
  try {
    const word = await Dictionary.findOne({
      $or: [{ english: translation }, { georgian: translation }],
    });
    if (!word) {
      return res.status(404).json({ error: "Word not found" });
    }
    res.json({
      french: word.french,
      english: word.english,
      georgian: word.georgian,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch word" });
  }
}
// export const updateWordsWithPartOfSpeechAndDefinition = async (req, res) => {
//   try {
//     const words = await Dictionary.find();

//     // Create an array to store the bulk write operations
//     const bulkOperations = words.map((word) => ({
//       updateOne: {
//         filter: { _id: word._id },
//         update: {
//           $set: { synonym: "", antonym: "" },
//         },
//       },
//     }));

//     // Perform the bulk write operation
//     await Dictionary.bulkWrite(bulkOperations);

//     console.log("Successfully updated words with synonym and antonym.");
//     res.json({ message: "Words updated successfully." });
//   } catch (err) {
//     console.error("Error updating words:", err);
//     res.status(500).json({ error: "Failed to update words" });
//   }
export const modifyFieldName = async (req, res) => {
  try {
    // Count the number of documents with "description" field before the update

    await Dictionary.updateMany({}, { $rename: { description: "definition" } });

    const countBeforeUpdate = await Dictionary.countDocuments({
      definition: { $exists: true },
    });
    res.status(200).json(countBeforeUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update field name" });
  }
};

// // Backend route
// export const getListOfVerbs = async (req, res) => {
//   const { data: verbs } = req.body;
//   console.log(verbs);
//   console.log("reqbody", req);

//   try {
//     const listOfVerbs = await Dictionary.find({ french: { $in: verbs } });
//     res.json(listOfVerbs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch verbs" });
//   }
// };
