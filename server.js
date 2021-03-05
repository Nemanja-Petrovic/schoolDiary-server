const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const uri = process.env.DB_URI;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  )
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const studentRouter = require("./routes/students");
const teachersRouter = require("./routes/teachers");
const classesRouter = require("./routes/classes");

app.use("/students", studentRouter);
app.use("/teachers", teachersRouter);
app.use("/classes", classesRouter);
