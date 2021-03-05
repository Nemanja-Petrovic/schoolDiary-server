const express = require("express");
const teacherController = require("../controllers/teacherController");

const router = express.Router();

router.get("/", teacherController.findTeachers_get);
router.get("/:id", teacherController.findTeacher_get);
router.post("/", teacherController.createTeacher_post);
router.delete("/:id", teacherController.deleteTeeacher_delete);
router.put("/:id", teacherController.editTeacher_put);

module.exports = router;
