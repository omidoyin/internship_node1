const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const orderCursorService = require('../services/orderCursorService');

// Get paginated orders
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, sort, direction } = req.query;
  try {
    const result = await orderService.getPaginatedOrders(Number(page), Number(limit), sort, direction);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Return orders with odd ids
router.get('/odd', async (req, res) => {
  try {
    const orders = await orderService.getOrdersWithOddIds();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Get orders using cursor pagination
router.get('/cursor', async (req, res) => {
  const { id = 1, limit = 10, sort, direction } = req.query;
  try {
    const result = await orderCursorService.getOrdersWithCursor(Number(id), Number(limit), sort, direction);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
