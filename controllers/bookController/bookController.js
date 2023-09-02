import Book from "../../modules/bookShemas/BookSchema.js";
// author: String,

export const getAllbooks = async (req, res) => {
  try {
    const books = await Book.find({}, "title author level poster description");
    if (!books) {
      return console.log("No books found");
    }
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSelectedBook = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedBook = await Book.findById({ _id: id });
    if (!selectedBook || selectedBook.length === 0) {
      return res.status(404).json({ message: "No data for selected book" });
    }
    res.status(200).json(selectedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookByLevel = async (req, res) => {
  const { level } = req.params;
  const booksByLevel = await Book.find({ level: level });
  if (!booksByLevel || booksByLevel.length === 0) {
    return console.log("No books found for this level");
  }
  res.status(200).json(booksByLevel);

  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const upadeteAllBooks = async (req, res) => {
  try {
    const updatedBooks = await Book.updateMany(
      {},
      {
        $set: {
          description: "",
        },
      }
    );
    res.status(200).json(updatedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
