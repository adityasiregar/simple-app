const express = require('express')
const router = express.Router()

const {create, findByEmail, findAll, findOne} = require('../controllers/user.controller')

router.post('/', create);
router.post('/find', findByEmail);
router.get('/', findAll)
router.get('/findone/:id', findOne)

module.exports = router ;