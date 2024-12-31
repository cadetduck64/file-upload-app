const {Router} = require('express')
const {getFileInfo} = require('../controllers/downloadController.js')
const {downloadFile} = require('../controllers/downloadController.js')
//multer file upload
const multer = require('multer')
const upload  = multer({dest: 'uploads/'})

const downloadRoute = Router()

downloadRoute.get('/', async (req, res) => {
    // if (!req.user)
    // {return res.redirect('/login')}
    const fileInfoRequest = await getFileInfo(req)
    {res.render('downloadView', {fileInfo: fileInfoRequest})}
})

downloadRoute.post('/', upload.single('fileInput'), async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    const downloadFileRequest = await downloadFile(req)
    console.log('downloading: ' +  downloadFileRequest.title)
    res.redirect('/profile')
})

module.exports = downloadRoute;