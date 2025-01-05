const database = require('../database/queries')
const cloudinary = require('cloudinary').v2;
const cloudinaryFunc = require('../database/cloudinary')


uploadControllerFunc = async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    // more detailed, comes from cloudinary
    const uploadToStorage = await cloudinaryFunc.uploadImage(req.file.path)
    // console.log(uploadToStorage)
    const download = await cloudinaryFunc.downloadFile(uploadToStorage.public_id)
    const getThumbnail = await cloudinaryFunc.getThumbnail(uploadToStorage.public_id)

    //sends data to database for easier querying
    const getStorageData = {
        'download_link' : download,
        'thumbnail' : getThumbnail,
        'asset_id' : uploadToStorage.asset_id,
        'public_id': uploadToStorage.public_id,
        'signature': uploadToStorage. signature,
        'width' : uploadToStorage.width,
        'height' : uploadToStorage.height,
        'format' : uploadToStorage.format,
        'resource_type' : uploadToStorage.resource_type,
        'bytes' : uploadToStorage.bytes,
        'display_name' : uploadToStorage.display_name,
    }
    const uploadToDatabase = database.uploadFile(req, getStorageData)
    return uploadToDatabase, uploadToStorage
}

module.exports = {uploadControllerFunc}