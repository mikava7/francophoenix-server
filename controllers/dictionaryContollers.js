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
    res.json(cleanWords);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch words" });
  }
};

// Controller to fetch words by their French translation (partial match) and sort them as required
export const getWordsByFrench = async (req, res) => {
  const { french } = req.params;
  try {
    const regex = new RegExp(french, "i"); // Case-insensitive partial match regex
    const words = await Dictionary.find({
      french: { $regex: regex },
    });

    // Sort the results based on exact match first and then by length (longest to shortest)
    words.sort((a, b) => {
      const aIsExactMatch = a.french.toLowerCase() === french.toLowerCase();
      const bIsExactMatch = b.french.toLowerCase() === french.toLowerCase();
      if (aIsExactMatch && !bIsExactMatch) return -1;
      if (!aIsExactMatch && bIsExactMatch) return 1;
      return a.french.length - b.french.length;
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