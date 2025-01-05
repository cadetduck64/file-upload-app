require('dotenv').config()

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Log the configuration
// console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result
      // return result.public_id;
    } catch (error) {
      console.error(error);
    }
};


const downloadFile = async (publicId) => {
  return cloudinary.url(publicId, {transformation: [
    {fetch_format: "jpg"},
    {flags: "attachment"}
    ]})
}

const getThumbnail = async (publicId) => {
  return cloudinary.image(publicId, {transformation: [
    {width: 200, height: 200}
    ]})
}

// Gets details of an uploaded image
const getAssetInfo = async (publicId) => {
    const options = {
    };
    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        // console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};

const destroyFile = async (publicId) => {
  console.log(publicId)
  return cloudinary.uploader.destroy(publicId)
}

// console.log(destroyFile('https://res.cloudinary.com/dryuqdvvy/image/upload/f_jpg/fl_attachment/7fc935f86fd4948554f6f1b4c2ad0f4e?_a=BAMCkGZU0'))

module.exports = {
  uploadImage,
  getAssetInfo,
  destroyFile,
  downloadFile,
  getThumbnail
}

{/* <form method="post" action="download">
<input hidden name="fileId" type="text" value="<%= locals.fileInfo.id %>">
<button type="submit">Download File</button>
</form> */}