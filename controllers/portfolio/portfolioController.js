import LeaderBoard from "../../modules/portfolio/leaderBoard/memeryBoard.js";

export const getLeaderBoard = async (req, res) => {
  try {
    const leaderBoard = await LeaderBoard.find();

    res.status(200).json(leaderBoard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leader board data" });
  }
};

export const inputRecord = async (req, res) => {
  const { name, time } = req.body;

  try {
    const newRecord = new LeaderBoard({
      name: name,
      time: time,
    });
    await newRecord.save();
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
