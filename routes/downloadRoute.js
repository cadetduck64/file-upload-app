const {Router} = require('express')
const {getFileInfo} = require('../controllers/downloadController.js')
const {downloadFile} = require('../controllers/downloadController.js')
const {getDownloaderInfo} = require('../controllers/downloadController.js')
const cloudinary = require('../database/cloudinary.js')

//multer file upload
const multer = require('multer')
const upload  = multer({dest: 'uploads/'})

const downloadRoute = Router()

downloadRoute.get('/', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    const fileInfoRequest = await getFileInfo(req)
    const downloaderInfo = await getDownloaderInfo(req)
    if (fileInfoRequest.uploaderId == downloaderInfo.id)
    {res.render('downloadView', {fileInfo: fileInfoRequest})}
    else {res.redirect('/login')}
})

module.exports = downloadRoute;