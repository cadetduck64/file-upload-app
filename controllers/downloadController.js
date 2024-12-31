const database = require('../database/queries')

const getFileInfo = async (req, res) => {
    const fileInfo  = await database.getFileById(req.query.fileId)
    return fileInfo
}

const downloadFile = async (req, res) => {
    const fileInfo = await database.getFileById(req.body.fileId)
    return fileInfo
}

module.exports = {getFileInfo, downloadFile};