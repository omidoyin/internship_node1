var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
let transaction = require('../models/index');
transaction = transaction.transaction

router.get('/', async (req, res) => {
  const transact = await transaction.findAll();
  res.json(transact);
});

router.get('/:id', async (req, res) => {
    const transact = await transaction.findByPk(req.params.id);
    if (transact) {
      res.json(transact);
    } else {
      res.status(404).send('transaction  not found');
    }
  });
  
  router.post('/', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
    try {
      const transact = await transaction.create(req.body);
      res.status(201).json(transact);
    } catch (error) {
        return res.status(400).json({ error: "Validation Error: " + error.message });
    }
  });
  
  
  router.put('/:id', async (req, res) => {
    const transact = await transaction.findByPk(req.params.id);
    if (transact) {
      await transact.update(req.body);
      res.json(transact);
    } else {
      res.status(404).send('transaction  not found');
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const transact = await transaction.findByPk(req.params.id);
    if (transact) {
      await transact.destroy();
      res.status(204).send("Deleted");
    } else {
      res.status(404).send('transaction  not found');
    }
  });

module.exports = router;
