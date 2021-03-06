const express = require('express')
const router = express.Router()
const controller = require('../controllers/alunasController')

router.get('/', controller.get)
router.get('/nasceuSP', controller.getSP)
router.get('/:id', controller.getById)
router.get('/:id/books', controller.getBooks)
router.get('/:id/getIdade', controller.getIdade)

router.post('/', controller.post)
router.post('/:id/books', controller.postBooks)

module.exports = router