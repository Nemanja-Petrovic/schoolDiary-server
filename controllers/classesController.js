const Class = require("../models/classes.model");

const findClasses_get = (req, res) => {
  Class.find()
    .then((classes) => res.json(classes))
    .catch((err) => res.status(400).json("Error: " + err));
};

const createClass_post = (req, res) => {
  const className = req.body.className;

  const date = Date.parse(req.body.date);

  const newClass = new Class({
    className,
    date,
  });

  newClass
    .save()
    .then(() => res.json("Class added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  findClasses_get,
  createClass_post,
};
