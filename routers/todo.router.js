const express = require('express')
const router = express.Router()

const {getToDo, postToDo} = require('../controllers/todo.controller')
const {create, callback} = require('../controllers/payment.controller')

router.get('/', getToDo);
router.post('/', postToDo);
router.post('/payment', create);
router.post('/callback', callback)

module.exports = router ;