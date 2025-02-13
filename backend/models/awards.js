const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Awards = mongoose.model("Awards", awardSchema);
module.exports = Awards;
