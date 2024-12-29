const {Router} = require('express')
const {uploadControllerFunc} = require('../controllers/uploadController.js')
//multer file upload
const multer = require('multer')
const upload  = multer({dest: 'uploads/'})

const uploadRoute = Router()

uploadRoute.get('/', async (req, res) => {
    if (!req.user)
    {return res.redirect('/login')}
    {res.render('uploadView')}
})

uploadRoute.post('/', upload.single('fileInput'), async (req, res) => {
    uploadControllerFunc(req)
    console.log(req.file)
    res.redirect('/profile')
})

module.exports = uploadRoute;