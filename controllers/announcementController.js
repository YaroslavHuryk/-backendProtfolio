const Project = require("../models/Project");
const Post = require("../models/Post");
const CV = require("../models/CV");

// exports.createProject = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     const project = await Project.create({
//       title,
//       description,
//       image: req.file.buffer, 
//     });

//     res.status(201).json({ message: "Saved", id: project._id });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.getProjects = async (req, res) => {
  try {
    if (req.query.type === "project") {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.json(projects);
    } else if (req.query.type === "post") {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.json(posts);
    } else {
      res.status(400).json({ message: "Invalid type parameter" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cloudinary = require('cloudinary').v2;

// Налаштування (краще тримати в .env)

exports.getCV = async (req, res) => {
  try {
    // 1. Переконайтеся, що publicId вказано ТОЧНО як у Media Library
    // Якщо файл у папці, шлях має бути 'folder/filename'
    const publicId = 'CV_3_rit3gl.pdf'; 

    const downloadUrl = cloudinary.url(publicId, {
      resource_type: 'image', // Обов'язково для PDF, якщо він не в категорії 'image'
      flags: 'attachment',  // Змушує браузер завантажувати файл, а не відкривати
      secure: true
    });

    console.log("Посилання згенеровано:", downloadUrl);
    res.json({ url: downloadUrl });

  } catch (error) {
    console.error("Помилка:", error);
    res.status(500).json({ message: "Не вдалося створити посилання" });
  }
};

