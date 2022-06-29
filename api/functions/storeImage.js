const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req" ,req.body);
    if (req.body.location == "signup") {
        
      cb(null, "./files/profiles");
    } else {
      cb(null, "./files/blogs");
    }
  },
  filename: function (req, file, cb) {
    console.log("inside distorage ", file, req.body);
    cb(
      null,
      Math.random().toString(16).slice(2) + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype.includes("image")) {
      console.log("inside if multer");
      cb(null, true);
    } else {
      console.log("inside multer else");
      cb(null, false);
    }
  },
  limits: { fileSize: 1000000000},
});

let st = multer({
  destination: "./files/blogs",
  filename: function (req, file, cb) {
    console.log("inside distorage ", req, file);
    cb(
      null,
      Math.random().toString(16).slice(2) + path.extname(file.originalname)
    );
  },
});
const blogImage = multer({
  storage: st,
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype);
    try {
      if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
        console.log("inside if multer");
        cb(null, true);
      } else {
        console.log("inside multer else");
        cb(null, false);
      }
    } catch (err) {
      console.log("error is ", err.message);
    }
  },
  
});

module.exports = { upload, blogImage };
