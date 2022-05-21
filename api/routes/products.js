const express = require('express');
const router = express.Router();
const multer = require('multer');
const ProductsController = require('../controllers/products');
const checkAuth = require('../middleware/check-auth');
// const mongoose = require('mongoose');
// const Product = require('../models/product');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});
//const upload = multer({dest: 'uploads/'});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
        //kalo mau error kalo salah
        //cb(new Error('message'), false);
    }
}
const upload = multer({
    storage: storage, 
    limit: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get('/:productId', ProductsController.products_get_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;