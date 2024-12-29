const database = require('../database/queries')

const profileControllerFunc = async (req, res) => {
    const getUserPosts = await database.getUserPosts(req)
    return getUserPosts
}

const getProfileFolders = async (req, res) => {
    const getUserFolders = await database.getUserFolders(req)
    return getUserFolders
}

const deleteFile = async (req, res) => {
    const deleteFile = await database.deleteFile(req)
    return deleteFile
}

const deleteFolder = async (req, res) => {
    const deleteFolder = await database.deleteFolder(req)
    return deleteFolder
}

const newFolder = async (req, res) => {
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

module.exports = {
    profileControllerFunc,
    deleteFile,
    newFolder,
    getProfileFolders,
    deleteFolder,
    openFolder,
    folderInsert}