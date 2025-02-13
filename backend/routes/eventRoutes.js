const express = require("express");
const { createEvent, getEvent, deleteEvent, getSingleEvent } = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// POST route for creating an event with file upload
router.route("/").post(upload, createEvent).get(getEvent);

router.route("/:id").get(getSingleEvent).delete(deleteEvent)

module.exports = router;
