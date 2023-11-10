import ErrorReport from "../../modules/reports/errorReportSchema.js";

export const reportError = async (req, res) => {
  const { name, text, userId, url, contentId } = req.body;
  try {
    if (!userId) {
      userId = "Not Logged in";
    }
    if (!contentId) {
      contentId = "No contentId";
    }
    const time = new Date(); // Add the current timestamp

    const report = new ErrorReport({
      name,
      text,
      userId,
      url,
      contentId,
      time,
    });

    await report.save();

    return res.json({
      success: true,
      message: "Report received successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error reporting problem" });
  }
};
