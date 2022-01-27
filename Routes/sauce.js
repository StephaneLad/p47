const express = require('express')

const router = express.Router()

const sauceController = require('../Controllers/sauce')
const auth = require('../middleware/auth')

router.get('/sauces',auth,sauceController.saucesGet)
router.get('/sauces/:id',auth,sauceController.sauceId)
router.post('/sauces',sauceController.saucesPost)
// router.put('/:id',sauceController.XX)
// router.delete('/:id',sauceController.XX)
// router.post('/:id/like',sauceController.XX)

module.exports = router