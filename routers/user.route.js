const express = require('express')
const router = express.Router()

const {create, findByEmail, findAll} = require('../controllers/user.controller')

router.post('/', create);
router.post('/find', findByEmail);
router.get('/', findAll)

module.exports = router ;