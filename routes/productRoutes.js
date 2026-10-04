const express = require('express')
const handlers = require('../controllers/productController')
const { useCache, resetCache } = require('../middleware/cache')

const routes = express.Router()

routes.get('/', useCache, handlers.getAll)
routes.get('/:id', useCache, handlers.getOne)

routes.post('/', resetCache, handlers.create)
routes.put('/:id', resetCache, handlers.replace)
routes.patch('/:id', resetCache, handlers.edit)
routes.delete('/:id', resetCache, handlers.remove)

module.exports = routes