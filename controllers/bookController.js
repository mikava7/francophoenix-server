import Book from "../modules/BookSchema.js";

export const getAllbooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return console.log("No books found");
    }
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
