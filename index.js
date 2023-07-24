import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const currentYear = new Date().getFullYear();
const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
let subjectHeadline = "";

const toDoArray = ["todo sample1", "todo sample2"]; // create new array to store todo items
const workToDoArray = ["work sample1", "work sample2"]; //2nd array for work list
let selectedArray = [];

app.get("/", (req, res) => {
  selectedArray = toDoArray;
  subjectHeadline = currentDate;
  res.render("index.ejs", { selectedArray, currentYear, subjectHeadline });
});

app.get("/work", (req, res) => {
  selectedArray = workToDoArray;
  subjectHeadline = "Work List";
  res.render("index.ejs", { selectedArray, currentYear, subjectHeadline });
});

app.post("/submit", (req, res) => {
  const newItem = req.body["newToDo"]; //user input from html form
  selectedArray.push(newItem); // add to array

  res.render("index.ejs", { selectedArray, currentYear, subjectHeadline });
});

app.listen(port, () => {
  console.log(`The server is listening on port ${port}.`);
});

//listen to input box checked/uncheck, add css text decoration strike-through
