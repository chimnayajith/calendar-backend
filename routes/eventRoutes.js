const express = require('express');
const router = express.Router();
const event = require('../models/taskModel');
const verifyToken = require("../middleware/auth");

// router.get('/events' , async(res , req ) => {
//     const events = event.find({createdBy : req.user._id});
//     res.json(events)
// })

router.get("/test" , verifyToken, async (req , res) => {
    res.status(200).send(`You are logged in as ${req.currentUser.username}`);
});

module.exports = router;