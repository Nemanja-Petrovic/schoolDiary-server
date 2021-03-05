const Teacher = require("../models/teacher.model");
const Class = require("../models/classes.model");

const findTeachers_get = (req, res) => {
  Teacher.find()
    .then((teachers) => res.json(teachers))
    .catch((err) => res.status(400).json("Error" + err));
};

const findTeacher_get = (req, res) => {
  Teacher.findById(req.params.id)
    .then((teacher) => res.json(teacher))
    .catch((err) => res.status(400).json("Error: " + err));
};

const createTeacher_post = async (req, res) => {
  const firstName = req.body.firstName;
  const label = req.body.label;
  const lastName = req.body.lastName;
  const className = req.body.className;
  const classId = await Class.findOne({ className });
  const date = Date.parse(req.body.date);

  const newTeacher = new Teacher({
    firstName,
    lastName,
    label,
    className,
    classId,
    date,
  });

  newTeacher
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

const editTeacher_put = async (req, res) => {
  const classId = await Class.findOne({ className: req.body.className });
  const newTeacher = {
    ...req.body,
    classId,
  };

  await Teacher.findByIdAndUpdate(req.params.id, newTeacher, {
    new: true,
    useFindAndModify: false,
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteTeeacher_delete = (req, res) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then(() => res.json("Teacher deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  findTeachers_get,
  createTeacher_post,
  findTeacher_get,
  deleteTeeacher_delete,
  editTeacher_put,
};
