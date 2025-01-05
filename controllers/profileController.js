const database = require('../database/queries')
const cloudinary = require('../database/cloudinary')

const profileControllerFunc = async (req, res) => {
    const getUserPosts = await database.getUserPosts(req)
    return getUserPosts
}

const getProfileFolders = async (req, res) => {
    const getUserFolders = await database.getUserFolders(req)
    return getUserFolders
}

const deleteFile = async (req, res) => {
    //DELETES FILE IN CLOUD STORAGE
    const destroyRequest = await database.getFileById(req.body.fileId)
    console.log(destroyRequest)
    const destroyFile = await cloudinary.destroyFile(destroyRequest.storageData.public_id)
    //DELETE FILE INFORMATION FROM LOCAL DATABASE
    const deleteFile = await database.deleteFile(req)
    return deleteFile, destroyFile
}

const deleteFolder = async (req, res) => {
    const deleteFolder = await database.deleteFolder(req)
    return deleteFolder
}

const newFolder = async (req, res) => {
    if (req.body.newFolderName == '')
    {req.body.newFolderName = 'New Folder'}
    const newFolder = await database.newFolder(req)
    return newFolder
}

const openFolder = async (req, res) => {
    const openFolder = await database.openFolder(req)
    return openFolder
}

const folderInsert = async (req, res) => {
    const folderInsert = await database.folderInsert(req)
    return folderInsert
}

const removeFolderFile = async (req, res) => {
    const removeFolderFile = await database.removeFolderFile(req)
    return removeFolderFile
}

const renameFile = async (req, res) => {
    const fileInfo  = await database.renameFileQuery(req)
    return fileInfo
}

const getFileThumbnail = async (req, res) => {
    const thumbnail = await cloudinary.getThumbnail(element.storageData.public_id)
    return thumbnail
}
module.exports = {
    profileControllerFunc,
    deleteFile,
    newFolder,
    getProfileFolders,
    deleteFolder,
    openFolder,
    folderInsert,
    removeFolderFile,
    renameFile,
    getFileThumbnail}