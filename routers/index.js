const express = require('express')
const router = express.Router()
const todo = require('./todo.router')
const user = require('./user.route')
const photo = require('./photo.route')

router.use('/todo', todo);
router.use('/user', user);
router.use('/photo', photo);

module.exports = router