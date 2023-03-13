var express = require('express');
var router = express.Router();

const Validator = require('fastest-validator');
const v = new Validator();

const { Customers } = require('../models')
router.get('/', async (req, res) => {
    const customers = await Customers.findAll();
    return res.json(customers);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const customer = await Customers.findByPk(id);
    if (!customer) {
        return res.json({message: 'customer not found'});
    }
    return res.json(customer);
});

router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        email: 'email|optional'
    }
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate)
    }
    const customer = await Customers.create(req.body);
    return res.json(customer)
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    let customer = await Customers.findByPk(id);
    if (!customer) {
        return res.json({message: 'customer not found'})
    }

    const schema = {
        name: 'string|optional',
        email: 'email|optional'
    }
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate) 
    }

    customer = await customer.update(req.body)
    return res.json(customer)

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const customer = await Customers.findByPk(id);
    if (!customer) {
        return res.json({message:'customer not found'});
    }
    await customer.destroy();
    return res.json({message:"delete customer success"})
})

module.exports = router