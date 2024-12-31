const database = require('../database/queries')
const cloudinary = require('cloudinary').v2;
const cloudinaryFunc = require('../database/index')


uploadControllerFunc = async (req, res) => {
    console.log(req.file)
    console.log(await cloudinaryFunc.uploadImage(req.file.path))
}

module.exports = {uploadControllerFunc}

//og code
    // const uploadedFile = database.uploadFile(req)
    // return uploadedFile