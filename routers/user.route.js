const express = require('express')
const router = express.Router()

const {create, findByEmail, findAll, findOne, signUp, signIn} = require('../controllers/user.controller')

router.post('/', create);
router.post('/find', findByEmail);
router.get('/', findAll)
router.get('/findone/:id', findOne)
router.post('/signUp', signUp)
router.post('/signIn', signIn)

module.exports = router ;