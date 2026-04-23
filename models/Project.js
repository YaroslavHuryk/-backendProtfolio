const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  description: {
    type: String, //link to the image stored in cloudinary
    required: true,
  },
  link: {
    type: String, //link to the project
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  __v:{
  type: Number,
  select: false
  }
});

module.exports = model("projects", projectSchema);