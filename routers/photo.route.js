const express = require('express')
const router = express.Router()
const {verify} = require('../middleware/authentication')
const {create} = require('../controllers/photo.controller')

router.post('/', verify, create);

module.exports = router ;