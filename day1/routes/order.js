var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
let order = require('../models/index');
order = order.order


router.get('/', async (req, res) => {
  const ord = await order.findAll({});
  res.json(ord);
});


router.get('/:id', async (req, res) => {
    const ord = await order.findByPk(req.params.id);
    if (ord) {
      res.json(ord);
    } else {
      res.status(404).send('order not found');
    }
  });



  router.post('/', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
  
    try {
      const ord = await order.create(req.body);
      res.status(201).json(ord);
    } catch (error) {
        return res.status(400).json({ error: "Validation Error: " + error.message });
    }
  });

    router.put('/:id', async (req, res) => {
        const ord = await order.findByPk(req.params.id);
        if (ord) {
          await ord.update(req.body);
          res.json(ord);
        } else {
          res.status(404).send('order not found');
        }
      });


  router.delete('/:id', async (req, res) => {
    const ord = await order.findByPk(req.params.id);
    if (ord) {
      await ord.destroy();
      res.status(204).send("deleted");
    } else {
      res.status(404).send('order not found');
    }
  });

      
  module.exports = router;
