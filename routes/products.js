var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Products } = require('../models')
const v = new Validator();
/* GET users listing. */
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        brands: 'string',
        description: 'string|optional'
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate)
    }
    const product = await Products.create(req.body);
    res.json(product);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id
    let product = await Products.findByPk(id);
    if (!product) {
        return res.json({message:'Product not found'})
    }
    // return res.json(product)
    const schema = {
        name: 'string|optional',
        brands: 'string|optional',
        description: 'string|optional'
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate)
    }
    product = await product.update(req.body);
    return res.json(product);
});

router.get('/', async (req, res) => {
    const products = await Products.findAll();
    return res.json(products)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    let product = await Products.findByPk(id);
    if (!product) {
        return res.json({message:'Product not found'})
    }
    res.json(product);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const product = await Products.findByPk(id);
    if (!product) {
        return res.json({message:'Product not found'})
    }
    await product.destroy();
    res.json({message:'Product deleted'});
});

module.exports = router;
