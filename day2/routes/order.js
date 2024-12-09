var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
let order = require('../models/index');
order = order.order
const { Op, literal } = require('sequelize');
const models = require('../models/index'); 
const orderService = require('../services/orderService');
const orderCursorService = require('../services/orderCursorService');

router.get('/cursor', async (req, res) => {
  const { id = 1, limit = 10, sort, direction } = req.query;
  try {
    const result = await orderCursorService.getOrdersWithCursor(Number(id), Number(limit), sort, direction);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }

});


// return orders with odd id's
router.get('/odd', async (req, res) => {
  try {
    const orders = await models.order.findAll({
      where: literal('id % 2 = 1') // This will filter out even IDs
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
})



// Get paginated orders
router.get('/', async (req, res) => {
  const { page = 1, limit = 100, sort, direction } = req.query;

  try {
    if(!req.query?.page || !req.query?.limit ) {
      const ord = await order.findAll();
      res.json(ord);
    } else {
        const result = await orderService.getPaginatedOrders(Number(page), Number(limit), sort, direction);
        res.json(result);
      }
  } catch (err) {
      res.status(500).send(err.message);
    }
});


// Get one order by id
router.get('/:id', async (req, res) => {
    const ord = await order.findByPk(req.params.id);
    if (ord) {
      res.json(ord);
    } else {
      res.status(404).send('order not found');
    }
  });



  // Add new order
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

   // Update an order
    router.put('/:id', async (req, res) => {
        const ord = await order.findByPk(req.params.id);
        if (ord) {
          await ord.update(req.body);
          res.json(ord);
        } else {
          res.status(404).send('order not found');
        }
      });


  // Delete order
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
