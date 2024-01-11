const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

console.log("api_key", process.env.API_KEY_CLOUD);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = {
  cloudinary,
  upload,
};
