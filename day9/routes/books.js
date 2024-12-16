const express = require('express');
const router = express.Router();
const checkBearerToken = require('../routes/authMiddlewares');
const maintenanceMiddleware = require('../routes/maintenanceMiddleware');

router.get('/', checkBearerToken, maintenanceMiddleware, async (req, res) => {
    try {
      
      res.json("orders");
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching orders' });
    }
  });



module.exports = router;