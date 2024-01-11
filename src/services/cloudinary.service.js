const { cloudinary } = require("../libs/cloudinary");

class CloudinaryService {
  constructor() {}

  async upload(file) {
    try {
      const image = await cloudinary.uploader.upload(file, {
        resource_type: "image",
        discard_original_filename: true,
        width: 500,
      });

      console.log(image, "imageCloud");
    } catch (error) {
      console.log(error, "errorCloud");
    }
  }
}

module.exports = CloudinaryService;
