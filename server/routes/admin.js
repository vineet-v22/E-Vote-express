const express = require("express");
const adminControl = require("../controllers/adminController");
const router = express.Router();
const {
  fetchAllUser,
  fetchPendingUser,
  adminResponse,
  fetchAllRequest,
  deleteRequest,
} = adminControl;

router.get("/fetchalluser", [], fetchAllUser);
router.get("/fetchpendinguser", [], fetchPendingUser);
router.post("/fetchpendinguser", [], adminResponse);
router.get("/request/fetchall", fetchAllRequest);
router.post("/request/delete", deleteRequest);
module.exports = router;
