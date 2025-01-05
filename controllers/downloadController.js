const database = require('../database/queries')

const getFileInfo = async (req, res) => {
    const fileInfo  = await database.getFileById(req.query.fileId)
    return fileInfo
}

const getDownloaderInfo = async (req, res) => {
    const downloaderInfo = await database.getUploaderData(req)
    return downloaderInfo
}

const downloadFile = async (req, res) => {
    const fileInfo = await database.getFileById(req.body.fileId)
    return fileInfo
}

module.exports = {getFileInfo, downloadFile, getDownloaderInfo};