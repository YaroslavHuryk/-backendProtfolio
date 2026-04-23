const { Schema, model } = require("mongoose");

const postSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  __v:{
  type: Number,
  select: false
  }
});

module.exports = model("posts", postSchema);

