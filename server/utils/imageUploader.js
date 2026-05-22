// const cloudinary = require("cloudinary").v2

// exports.uploadImageToCloudinary = async(file,folder,height ,quality)=>{
//     const options = {folder,
//         resource_type: "auto",
//         fetch_format: "auto",     // auto choose best format (webp, jpg, png)
//         quality: quality || "auto:best" // keep highest possible quality
//     }
//     if(height){
//         options.height = height;
//         options.crop = "limit"; 
//     }
//     if(quality) {
//         options.quality = quality;
//          options.crop = "limit";   // prevents stretching small images
//     }
//     // options.resource_type = "auto";

//     return await cloudinary.uploader.upload(file.tempFilePath,options)
// }


const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = {
    folder,
    resource_type: "auto",          // auto-detect image / video
    chunk_size: 20 * 1024 * 1024,    // 20MB chunks (IMPORTANT for big files)
  };

  // 🟢 IMAGE-SPECIFIC OPTIONS
  if (file.mimetype.startsWith("image")) {
    options.fetch_format = "auto";
    options.quality = quality || "auto:best";

    if (height) {
      options.height = height;
      options.crop = "limit";
    }
  }

  // 🔥 VIDEO-SPECIFIC OPTIONS (THIS FIXES YOUR ERROR)
  if (file.mimetype.startsWith("video")) {
    options.eager_async = true;     // async processing (MANDATORY)
    options.timeout = 10 * 60 * 1000; // 10 min
  }

  return await cloudinary.uploader.upload(
    file.tempFilePath,
    options
  );
};
