var express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
let rules = require('../models/rules')(sequelize, DataTypes);


  router.get('/', async (req, res) => {
    
    if(!req.query.variable) {
      return res.status(400).json({ error: `variable parameter is required` });
    }

    const variables = JSON.parse(Buffer.from(req.query.variable, 'base64').toString()) 
    const query = await rules.findAll()
    const results = []

    for(let rule of query) {
      let condition = rule.condition
      console.log(condition, 'rulee')
      for(let variable in variables) {
        let re = new RegExp(variable, "g")
        condition = condition.replace(re, variables[variable])
      }

      if(eval(condition)) {
        results.push({
          rule_id: rule.id,
          result: rule.action
        }) 
      }
    }

    res.json(results);
  })

      
  module.exports = router;
