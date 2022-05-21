const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs => {
        //res.status(200).json(docs);
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: req.protocol + '://' + req.headers.host + '/orders/' + doc._id
                    }
                }
            })
        });
    }).catch( err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.order_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
    .then( product =>{
        if (!product){
            return res.status(404).json({
                message: "Product not Found"
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save().then( result => {
            //console.log(result);
            res.status(201).json({
               message: 'Order Stored',
               createdOrder: {
                   _id: result._id,
                   product: result.product,
                   quantity: result.quantity
               },
               request: {
                type: 'GET',
                url: req.protocol + '://' + req.headers.host + '/orders/' + result._id
                } 
            });
        });
    }).catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

exports.order_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
        if (!order) { //kalo null
            return res.status(404).json({
                message: "Order not Found"
            });
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: req.protocol + '://' + req.headers.host + '/orders/'
            } 
        });
    }).catch( err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.order_delete_order = (req, res, next) => {
    Order.deleteOne({_id: req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: "POST",
                url: req.protocol + '://' + req.headers.host + '/orders/',
                body: {
                    productId: "ID",
                    quantity: "Number"
                }
            }
        })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
}