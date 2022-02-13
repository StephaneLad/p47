const express = require('express')


const router = express.Router()

const sauceController = require('../Controllers/sauce')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/sauces',auth,sauceController.saucesGet)
router.get('/sauces/:id',auth,sauceController.sauceId)
router.post('/sauces',auth,multer,sauceController.saucesPost)
router.put('/sauces/:id',auth,multer,sauceController.saucePut)
router.delete('/sauces/:id',auth,sauceController.sauceDelete)
router.post('/sauces/:id/like',auth,sauceController.sauceLike)

module.exports = router
