const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.get("/", studentController.findStudents_get);
router.post("/", studentController.createStudent_post);
router.get("/:id", studentController.findStudent_get);
router.delete("/:id", studentController.deleteStudent_delete);
router.put("/:id", studentController.updateStudent_put);

module.exports = router;
