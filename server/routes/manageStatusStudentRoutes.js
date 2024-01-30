const express = require("express");

const { myApply } = require("../controllers/manageStatusStudentController");

const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/myStatus", auth, myApply);

module.exports = router;
