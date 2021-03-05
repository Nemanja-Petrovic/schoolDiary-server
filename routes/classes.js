const express = require("express");
const classController = require("../controllers/classesController");

const router = express.Router();

router.get("/", classController.findClasses_get);
router.post("/", classController.createClass_post);

module.exports = router;
