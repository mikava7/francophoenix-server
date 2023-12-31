import { validationResult } from "express-validator";

export default (req, res, next) => {
  // Check for errors that may have occurred during validation
  const error = validationResult(req);
  // console.log("validationResult", error);

  if (!error.isEmpty()) {
    // If errors exist, send them back as a JSON response with a status of 404
    // console.log("validationResult", error);
    return res.status(404).json(error.array());
  }
  // If no errors exist, continue to the next middleware function
  next();
};
