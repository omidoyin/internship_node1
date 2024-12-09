var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
let model = require('../models/index');
let order = model.order
let transaction = model.transaction
const { Op, literal,  } = require('sequelize');


router.get('/sale', async (req, res) => {
  let { month, year, from_date, to_date } = req.query;

  // Check if 'month' and 'year' are provided
  if (month && year) {
    try {
      const totalAmount = await order.sum('amount', {
        where: {
          date: {
            [Op.gte]: new Date(year, month - 1, 1),
            [Op.lt]: new Date(year, month, 1)
          }
        }
      });
  
      res.json({
        month: month,
        year: year,
        totalAmount: totalAmount
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

  } else if(from_date && to_date) {
      // Convert to Date objects
      from_date = new Date(from_date);
      to_date = new Date(to_date);

      // Swap if from_date is later than to_date
      if (from_date > to_date) {
        [from_date, to_date] = [to_date, from_date];
      }

      try {
        const total = await order.sum('amount', {
          where: {
            date: {
              [Op.between]: [from_date, to_date]
            }
          }
        });

        res.json({
          from_date,
          to_date,
          total
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(500).json({ error: "An error occured"});
    }
});

router.get('/monthly', async (req, res) => {
  const year = req.query.year;

  if (!year) {
    return res.status(400).json({ error: `year parameter is required` });
  }


  try {
    const sales = await order.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
      ],
      where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), '=', year),
      group: ['month'],
      raw: true
    });


    // Filter out months with zero sales
    const nonZeroSales = sales.filter(sale => sale.total !== 0);
    res.json(nonZeroSales);
  } catch (error) {
    res.status(500).json( error.message );
  }
});

router.get('/user', async (req, res) => {
  const year = req.query.year;
  const userId = req.query.user_id;

  if (!year || !userId) {
    return res.status(400).json({ error: `Year and user_id parameters are required` });
  }

  try {
    const sales = await order.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
      ],
      where: {
        user_id: userId,
        date: {
          [Sequelize.Op.between]: [new Date(year, 0, 1), new Date(year, 11, 31, 23, 59, 59)]
        }
      },
      group: ['month'],
      raw: true
    });

    // Filter out months with zero sales
    const nonZeroSales = sales.filter(sale => sale.total !== 0);

    res.json(nonZeroSales);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/shipping_dock', async (req, res) => {
  const year = req.query.year;
  const shippingId = req.query.shipping_dock_id;

  if (!year || !shippingId) {
    return res.status(400).json({ error: `Year and shipping_id parameters are required` });
  }
  try {
    const sales = await transaction.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total']
      ],
      where: {
        shipping_dock_id: shippingId,
        date: {
          [Sequelize.Op.between]: [new Date(year, 0, 1), new Date(year, 11, 31, 23, 59, 59)]
        }
      },
      group: ['month'],
      raw: true
    });

    // Filter out months with zero sales
    const nonZeroSales = sales.filter(sale => sale.total !== 0);

    res.json(nonZeroSales);
  } catch (error) {
    res.status(500).json( error.message );
  }
});


router.get('/count', async (req, res) => {
  const year = req.query.year;
  const userId = req.query.user_id;

  if (!year || !userId) {
    return res.status(400).json({ error: `Year and user_id parameters are required` });
  }

  try {
    const result = await 
    order.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'order_count']
      ],
      where: {
        user_id: userId,
        date: {
          [Sequelize.Op.between]: [new Date(year, 0, 1), new Date(year, 11, 31, 23, 59, 59)]
        }
      },
      group: [Sequelize.fn('MONTH', Sequelize.col('date'))],
      order: [Sequelize.fn('MONTH', Sequelize.col('date'))]
    })

    const orderCounts = Array(12).fill(0);
    result.forEach(item => {
      orderCounts[item.getDataValue('month') - 1] = item.getDataValue('order_count');
    });
  
    res.json(orderCounts.map((count, index) => ({
      month: index + 1,
      order_count: count
    })));
  } catch (error) {
    res.status(500).json( error.message );
  }
});
      
module.exports = router;
