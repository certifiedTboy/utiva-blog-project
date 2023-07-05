const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads");
  },

  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.originalname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, callback) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    callback(new Error(`unsupported file format`));
  }
  callback(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = upload;
