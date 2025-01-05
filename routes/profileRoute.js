const {Router} = require('express')
const profileRoute = Router()
const {profileControllerFunc} = require('../controllers/profileController.js')
const {deleteFile} = require('../controllers/profileController.js')
const {newFolder} = require('../controllers/profileController.js')
const {getProfileFolders} = require('../controllers/profileController.js')
const {deleteFolder} = require('../controllers/profileController.js')
const {openFolder} = require('../controllers/profileController.js')
const {folderInsert} = require('../controllers/profileController.js')
const {removeFolderFile} = require('../controllers/profileController.js')
const {getFileThumbnail} = require('../controllers/profileController.js')
const {renameFile} = require('../controllers/profileController.js')

profileRoute.get('/', async (req, res, err) => {
    if (!req.user)
    {return res.redirect('/login')}
    console.log('profile')
    const userFiles = await profileControllerFunc(req)
    const userFolders = await getProfileFolders(req)
    res.render('profileView', {files: userFiles, user: req.user.username, folders: userFolders})
})

//file actions
profileRoute.post('/deletefile', async (req, res, err) => {
    if (!req.user)
    {return res.redirect('/login')}
    const deleterequest = await deleteFile(req)
    deleterequest
    res.redirect('/profile')
})

profileRoute.post('/renamefile', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    const renameRequest = await renameFile(req)
    renameRequest
    res.redirect('/profile')
})

//folder actions
profileRoute.get('/folder', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    const openFolderRequest = await openFolder(req)
    console.log(openFolderRequest)
    res.render('folderView', {folderContents: openFolderRequest})
})

profileRoute.post('/newfolder', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    console.log('newFolder')
    const newFolderRequest = await newFolder(req)
    newFolderRequest
    res.redirect('/profile')
})

profileRoute.post('/folderinsert', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    console.log('folderinsert')
    const folderinsertRequest = await folderInsert(req)
    folderinsertRequest
    res.redirect('/profile')
})

profileRoute.post('/deletefolder', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    console.log('delete folder route')
    const deleteFolderRequest = await deleteFolder(req)
    deleteFolderRequest
    res.redirect('/profile')
})

profileRoute.post('/removefolderfile', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    console.log('removing file from folder')
    const removeFolderFileRequest = await removeFolderFile(req)
    removeFolderFileRequest
    res.redirect('/profile')
})



module.exports = profileRoute