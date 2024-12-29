const {Router} = require('express')
const indexRoute = Router()
const {indexControllerFunc} = require('../controllers/indexController')

indexRoute.get('/', async (req, res) => {
    console.log('index')
    res.render('indexView', {user: req.user})
})

module.exports = indexRoute