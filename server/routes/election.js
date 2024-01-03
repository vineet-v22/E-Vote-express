const express = require("express");
const {
  create,
  vote,
  result,
  getElections,
  getCandidates,
  createRequest,
} = require("../controllers/electionController");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/getuser");
const router = express.Router();

router.post(
  "/create",
  fetchUser,
  [
    body(
      "election_id",
      "Length of election ID should be between 2 and 6 characters long."
    ).isLength({ min: 2 }),
    body("election_name", "Election name should not be empty.").exists(),
    body("edate", "Election date should not be empty.").exists(),
    body("candidates", "Candidates list should not be empty").isArray(),
  ],
  create
);

router.get("/getall", fetchUser, getElections);
router.get("/getallcandidates/:id", fetchUser, getCandidates);
router.post("/vote", fetchUser, vote);
router.get("/result", result);
router.post("/request", createRequest);

module.exports = router;
