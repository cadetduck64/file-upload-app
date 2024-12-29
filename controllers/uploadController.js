const database = require('../database/queries')

uploadControllerFunc = async (req, res) => {
    const uploadedFile = database.uploadFile(req)
    return uploadedFile
}

module.exports = {uploadControllerFunc}