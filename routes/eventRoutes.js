const express = require("express");
const router = express.Router();
const event = require("../models/taskModel");
const verifyToken = require("../middleware/auth");
const generateMatrix = require("../utils/events/generateMatrix");
const Task = require("../models/taskModel");
const populateMatrix = require("../utils/events/populateMatrix");

router.get("/get-events/:year/:month", verifyToken, async (req, res) => {
  const { year, month } = req.params;

  // generate the calendar structure for the provided year and month
  const matrix = await generateMatrix(year, month);
  const populatedMatrix = await populateMatrix(
    matrix,
    year,
    month,
    req.currentUser.userId
  );
  res.json(populatedMatrix);
});

router.post("/create/", verifyToken, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log(title, description, date);
    if (!(title && description && date)) {
      throw Error("Empty input fields");
    }
    // creating new task
    const newTask = await new Task({
      title,
      description,
      date: new Date(date),
      createdBy: req.currentUser.userId,
    });

    const createdTask = await newTask.save();

    res.status(200).json(createdTask);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete("/delete/", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw Error("ID field is required.");
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json("Deleted succesfully");
  } catch (error) {}
});

router.put("/update/", verifyToken, async (req, res) => {
  try {
    const { id, title, description, date } = req.body;

    if (!id) {
      throw Error("ID field is required.");
    }

    if (!(title || description || date)) {
      throw Error("Values to update not provided");
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (date) updateFields.date = date;

    console.log(updateFields);
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateFields,
      }
    );

    if (!updatedTask) {
      throw new Error("Task not found or not updated.");
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
