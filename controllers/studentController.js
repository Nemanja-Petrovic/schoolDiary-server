let Student = require("../models/student.model");
let Class = require("../models/classes.model");

const findStudents_get = (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json("Error: " + err));
};

const findStudent_get = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => res.status(400).json("Error: " + err));
};

const createStudent_post = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const className = req.body.className;
  const label = req.body.label;
  const classId = await Class.findOne({ className });
  const average = Number(req.body.average);
  const date = Date.parse(req.body.date);

  const newStudent = new Student({
    firstName,
    lastName,
    label,
    className,
    classId,
    average,
    date,
  });

  newStudent
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteStudent_delete = (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json("Student deleteted!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateStudent_put = async (req, res) => {
  const classId = await Class.findOne({ className: req.body.className });

  const newStudent = {
    ...req.body,
    classId,
  };

  Student.findByIdAndUpdate(req.params.id, newStudent, {
    new: true,
    useFindAndModify: false,
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  findStudents_get,
  updateStudent_put,
  deleteStudent_delete,
  createStudent_post,
  findStudent_get,
};
