const express = require('express')
const router = express.Router()

const {getToDo, postToDo} = require('../controllers/todo.controller')

router.get('/', getToDo);
router.post('/', postToDo);

module.exports = router ;