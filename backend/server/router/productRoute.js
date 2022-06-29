const route = require('express').Router()
const {createProduct, editProduct, getProduct } = require('../controller/productController')
const store = require('../middleware/multer')

route.post('/', store.array("productImg"), createProduct)
route.put('/',store.array("productImg"), editProduct)
route.get('/', getProduct)

module.exports= route;

